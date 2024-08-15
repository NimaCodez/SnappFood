import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	UploadedFile,
	ParseFilePipe,
	MaxFileSizeValidator,
	FileTypeValidator,
	ParseIntPipe,
	Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { EApiConsumes } from 'src/common/enums/api-consumes.enum';
import { uploadFileS3 } from 'src/common/interceptors/upload-file.interceptor';
import { Paginate, PaginationDto } from 'src/common/utils/pagination.util';

@Controller('category')
@ApiTags('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@ApiConsumes(EApiConsumes.Multipart)
	@UseInterceptors(uploadFileS3('image'))
	async create(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
					new FileTypeValidator({ fileType: 'image/(png|jpg|jpeg|webp)' }),
				],
			}),
		)
		image: Express.Multer.File,
		@Body() createCategoryDto: CreateCategoryDto,
	) {
		return await this.categoryService.create(createCategoryDto, image);
	}

	@Get()
	@Paginate()
	findAll(@Query() paginationDto: PaginationDto) {
		return this.categoryService.findAll(paginationDto);
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.categoryService.findOneById(id);
	}

	@Patch(':id')
	@ApiConsumes(EApiConsumes.Multipart, EApiConsumes.UrlEncoded)
	@UseInterceptors(uploadFileS3('image'))
	update(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
					new FileTypeValidator({ fileType: 'image/(png|jpg|jpeg|webp)' }),
				],
        fileIsRequired: false
			})
		)
		image: Express.Multer.File,
		@Param('id', ParseIntPipe) id: number,
		@Body() updateCategoryDto: UpCategoryDto,
	) {
		return this.categoryService.update(+id, updateCategoryDto, image);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.categoryService.remove(+id);
	}
}
