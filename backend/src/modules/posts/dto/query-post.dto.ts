import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { QueryDto } from 'src/dto/query.dto';

export class QueryPostDto extends QueryDto {
    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
	@ApiProperty({ required: false, example: "1926b380-f523-41e5-b527-d12ee54607d0" })
    category_id: string;
}

export default QueryPostDto;
