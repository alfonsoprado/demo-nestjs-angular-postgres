import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsInt,
	IsOptional,
	IsPositive,
	Min,
} from 'class-validator';

export class QueryDto {
	@IsOptional()
	@IsInt()
	@Min(0, {
		context: {
			min: 0,
		},
	})
	@Type(() => Number)
	@ApiProperty({ required: false, example: 0 })
	page?: number;

	@IsOptional()
	@IsInt()
	@IsPositive()
	@Type(() => Number)
	@ApiProperty({ required: false, example: 10 })
	pageSize?: number;
}
