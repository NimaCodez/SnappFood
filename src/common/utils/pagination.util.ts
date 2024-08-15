import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export class PaginationDto {
	page?: number;
	limit?: number;
}

export function Paginate() {
	return applyDecorators(
		ApiQuery({
			name: 'page',
			required: false,
		}),
		ApiQuery({
			name: 'limit',
			required: false,
		}),
	);
}

export function paginationExecutor(page: number, limit: number) {
	const skip = page > 0 ? (page - 1) * limit : 0;
	const take = limit > 0 ? limit : 10;

	return {
		skip,
		take,
	};
}

export function paginationResponseGenerator(
	page: number,
	limit: number,
	totalCount: number,
) {
	const totalPages = Math.ceil(totalCount / limit);

	return {
		page,
		limit,
		totalCount,
		totalPages,
	};
}
