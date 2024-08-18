import {
	BadRequestException,
	ConflictException,
	Inject,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	Scope,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { FilterData } from 'src/common/utils/filter-nulls.util';
import { S3Service } from '../s3/s3.service';
import { NotFoundError } from 'rxjs';
import {
	PaginationDto,
	paginationExecutor,
	paginationResponseGenerator,
} from 'src/common/utils/pagination.util';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { log } from 'console';

@Injectable({ scope: Scope.REQUEST })
export class CategoryService {
	constructor(
		@InjectRepository(Category) private categoryRepo: Repository<Category>,
		private s3Service: S3Service,
		@Inject(REQUEST) private req: Request,
	) {}
	async create(
		createCategoryDto: CreateCategoryDto,
		image: Express.Multer.File,
	) {
		const { slug, parentId } = createCategoryDto;
		const category = await this.findOneBySlug(slug);
		if (category) throw new ConflictException('Category already exists');

		const { Location, Key } = await this.s3Service.uploadFile(
			image,
			'category-images',
		);

		let parent: Category = null;
		if (parentId && !isNaN(parentId))
			parent = await this.findOneById(+parentId);

		let updateBody = {} as Partial<CreateCategoryDto>;
		Object.assign(updateBody, FilterData(createCategoryDto));
		updateBody.image = Location;
		updateBody.image_key = Key;
		updateBody.parentId = parent?.id;
		await this.categoryRepo.insert({ ...updateBody });

		return {
			message: 'Image uploaded successfully and category was created.',
			image: Location,
		};
	}

	async findAll(paginationDto: PaginationDto) {
		const { limit, page } = paginationDto;
		const { skip, take } = paginationExecutor(page, limit);

		const [categories, count] = await this.categoryRepo.findAndCount({
			where: {},
			relations: {
				parent: true,
			},
			select: {
				parent: {
					title: true,
				},
			},
			skip,
			take,
			order: {
				id: 'ASC',
			},
		});

		return {
			categories,
			pagination: paginationResponseGenerator(page, take, count),
		};
	}

	async findOneBySlug(slug: string) {
		return await this.categoryRepo.findOneBy({ slug });
	}

	async findOneById(id: number) {
		const category = await this.categoryRepo.findOneBy({ id });
		if (!category) throw new NotFoundException('Category not found');
		return category;
	}

	async update(
		id: number,
		updateCategoryDto: UpdateCategoryDto,
		image: Express.Multer.File,
	) {
		let category = await this.findOneById(id);
		let updateBody: Partial<Category> = FilterData(updateCategoryDto);
		let imageWasUpdated = false;

		if (image) {
			await this.s3Service.deleteFile(category.image_key);
			const { Location, Key } = await this.s3Service.uploadFile(
				image,
				'category-images',
			);
			
			updateBody.image = Location;
			updateBody.image_key = Key;
			imageWasUpdated = true;
		}
		
		if (imageWasUpdated || Object.keys(updateBody).length > 0) {
			const { affected } = await this.categoryRepo.update(category.id, updateBody);
			if (affected === 1) {
				return {
					message: 'Category was updated successfully.',
				}
			} else {
				throw new InternalServerErrorException('Failed to update category');
			}
		}

		throw new BadRequestException('Nothing was updated');
	}

	async remove(id: number) {
		const category = await this.findOneById(id);
		const { affected } = await this.categoryRepo.delete(category.id);
		if (affected === 1) {
			await this.s3Service.deleteFile(category.image_key);
			return { message: 'Category deleted successfully.'}
		}
		else throw new BadRequestException('Something went wrong during deleting data.')
	}
}
