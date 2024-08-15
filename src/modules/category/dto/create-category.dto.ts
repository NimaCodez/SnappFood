import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
	@ApiProperty()
	title: string;
	@ApiPropertyOptional({ nullable: true })
	slug: string;
	@ApiProperty({ format: 'binary' })
	image: string;
	image_key: string;
	@ApiProperty({ type: Boolean })
	show: boolean;
	@ApiPropertyOptional({ nullable: true })
	parentId: number;
}

export class UpCategoryDto {
	@ApiPropertyOptional()
	title: string;
	@ApiPropertyOptional({ nullable: true })
	slug: string;
	@ApiPropertyOptional({ format: 'binary' })
	image: string;
	@ApiPropertyOptional({ type: Boolean })
	show: boolean;
	@ApiPropertyOptional({ nullable: true })
	parentId: number;
}
