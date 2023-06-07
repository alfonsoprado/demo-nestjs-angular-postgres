import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { assertColumnNotUsed, assertRecordExists, pagination } from 'src/helpers/typeorm';
import { Repository } from 'typeorm';
import QueryCategoryDto from './dto/query-category.dto';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoriesRepository: Repository<Category>,
	) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);

    await assertColumnNotUsed({
      repository: this.categoriesRepository, 
      uniqueKeys: { name: category.name }, 
      message: "The name of the category is already used."
    });

    return await this.categoriesRepository.save(category);
  }

  async findAll(queryCategoryDto: QueryCategoryDto) {
		const dbQuery = this.categoriesRepository.createQueryBuilder();

    // Pagination
    pagination(dbQuery, queryCategoryDto);

    const [rows, totalRows] = await dbQuery.getManyAndCount();

    return {
      rows,
      totalRows
    };
  }

  async findOne(id: string) {
    const category = await assertRecordExists(
      this.categoriesRepository, 
      { id },
      "The category does not exist."
    );
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let category = this.categoriesRepository.create({
      id,
      ...updateCategoryDto
    });

    await assertRecordExists(
      this.categoriesRepository, 
      { id },
      "The category does not exist."
    );

    await assertColumnNotUsed({
      repository: this.categoriesRepository, 
      uniqueKeys: { name: category.name }, 
      message: "The name of the category is already used.",
      primaryKeys: {
        id: category.id
      }
    });

    return await this.categoriesRepository.save(category)
  }

  async remove(id: string) {
    const category = await assertRecordExists(
      this.categoriesRepository, 
      { id } 
    );
    return await this.categoriesRepository.remove(category);
  }
}
