import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import QueryPostDto from './dto/query-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/entities/post.entity';
import { assertColumnNotUsed, assertRecordExists, pagination } from 'src/helpers/typeorm';
import { CategoriesService } from 'src/modules/categories/categories.service';
import User from 'src/entities/user.entity';

@Injectable()
export class PostsService {
	constructor(
    @InjectRepository(Post)
		private readonly postRepository: Repository<Post>,
    private readonly categoriesService: CategoriesService
	) {}

  async create(user: User, createPostDto: CreatePostDto) {
    let post = this.postRepository.create(createPostDto);

    const category = await this.categoriesService.findOne(post.category_id); // Check if category exist

    await assertColumnNotUsed({
      repository: this.postRepository, 
      uniqueKeys: { category_id: category.id, title: post.title }, 
      message: "There already exists a post with that title within that category."
    });

    post.created_by = user.id;
    post = await this.postRepository.save(post);
    post.category = category;
    return post;
  }

  async findAll(queryPostDto: QueryPostDto) {
		const dbQuery = this.postRepository.createQueryBuilder();

    // Filters
    if (queryPostDto.category_id) {
      const category = await this.categoriesService.findOne(queryPostDto.category_id); // Check if category exist
      dbQuery.andWhere("category_id = :category_id", {
        category_id: category.id,
      });
    }

    // Pagination
    pagination(dbQuery, queryPostDto);

    const [rows, totalRows] = await dbQuery.getManyAndCount();

    return {
      rows,
      totalRows
    };
  }

  async findOne(id: string) {
    return await assertRecordExists(
      this.postRepository, 
      { id },
      "The post does not exist."
    );
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    let post = this.postRepository.create({
      id,
      ...updatePostDto
    });

    if(updatePostDto.category_id) {
      await this.categoriesService.findOne(updatePostDto.category_id); // Check if category exist
    }

    await assertRecordExists(
      this.postRepository, 
      { id },
      "The post does not exist."
    );

    await assertColumnNotUsed({
      repository: this.postRepository, 
      uniqueKeys: { category_id: post.category_id, title: post.title }, 
      message: "There already exists a post with that title within that category.",
      primaryKeys: {
        id: post.id
      }
    });

    return await this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await assertRecordExists(
      this.postRepository, 
      { id } 
    );
    await this.postRepository.remove(post);
    return post;
  }
}
