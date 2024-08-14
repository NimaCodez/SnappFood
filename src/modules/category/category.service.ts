import {
	ConflictException,
	Injectable,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { FilterData } from 'src/common/utils/filter-nulls.util';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(Category) private categoryRepo: Repository<Category>,
		private s3Service: S3Service,
	) {}
	async create(
		createCategoryDto: CreateCategoryDto,
		image: Express.Multer.File,
	) {
		const { slug } = createCategoryDto;
		const category = await this.findOneBySlug(slug);
		if (category) throw new ConflictException('Category already exists');

    const { Location } = await this.s3Service.uploadFile(
			image,
			'category-images',
		);

		let updateBody = {} as Partial<CreateCategoryDto>;
		Object.assign(updateBody, FilterData(createCategoryDto));
		updateBody.image = Location;
    await this.categoryRepo.insert({...updateBody});

    return {
      message: 'Image uploaded successfully and category was created.',
      image: Location,
    }
	}

	findAll() {
		return `This action returns all category`;
	}

	async findOneBySlug(slug: string) {
		return await this.categoryRepo.findOneBy({ slug });
	}

	findOne(id: number) {
		return `This action returns a #${id} category`;
	}

	update(id: number, updateCategoryDto: UpdateCategoryDto) {
		return `This action updates a #${id} category`;
	}

	remove(id: number) {
		return `This action removes a #${id} category`;
	}
}
