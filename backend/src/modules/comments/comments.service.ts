import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PostsService } from 'src/modules/posts/posts.service';
import QueryCommentDto from './dto/query-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { assertRecordExists, pagination } from 'src/helpers/typeorm';
import User from 'src/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly postsService: PostsService
  ) {}

  async create(user: User, post_id: string, createCommentDto: CreateCommentDto) {
    const post = await this.postsService.findOne(post_id); // Check if post exist

    let comment = this.commentsRepository.create(createCommentDto);
    comment.post_id = post.id;
    comment.created_by = user.id;
    comment = await this.commentsRepository.save(comment);
    comment.post = post;
    return comment;
  }

  async findAll(post_id: string, queryCommentDto: QueryCommentDto) {
    const post = await this.postsService.findOne(post_id); // Check if post exist

    const dbQuery = this.commentsRepository.createQueryBuilder();

    dbQuery.andWhere("post_id = :post_id", {
      post_id: post.id,
    });

    // Pagination
    pagination(dbQuery, queryCommentDto);

    const [rows, totalRows] = await dbQuery.getManyAndCount();

    return {
      rows,
      totalRows
    };
  }

  async findOne(post_id: string, id: string) {
    await this.postsService.findOne(post_id); // Check if post exist

    return await assertRecordExists(
      this.commentsRepository, 
      { id },
      "The comment does not exist."
    );
  }

  async update(user: User, post_id: string, id: string, updateCommentDto: UpdateCommentDto) {
    let updateComment = this.commentsRepository.create({
      id,
      ...updateCommentDto
    });

    const comment = await this.postsService.findOne(post_id); // Check if post exist

    await assertRecordExists(
      this.commentsRepository, 
      { id },
      "The comment does not exist."
    );

    if(comment.created_by !== user.id) {
      throw new HttpException(
				"You can't update a comment that doesn't belong to you.",
				HttpStatus.UNAUTHORIZED,
			);
    }

    return await this.commentsRepository.save(updateComment)
  }

  async remove(user: User, post_id: string, id: string) {
    await this.postsService.findOne(post_id); // Check if post exist

    const comment = await assertRecordExists(
      this.commentsRepository, 
      { id } 
    );

    if(comment.created_by !== user.id) {
      throw new HttpException(
				"You can't delete a comment that doesn't belong to you.",
				HttpStatus.UNAUTHORIZED,
			);
    }
    
    return await this.commentsRepository.remove(comment);
  }
}
