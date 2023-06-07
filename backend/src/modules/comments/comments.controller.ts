import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiHeader } from '@nestjs/swagger';
import QueryCommentDto from './dto/query-comment.dto';
import User from 'src/entities/user.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Comments')
@Controller('/posts/:post_id/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint that requires authentication.' })
  async create(@CurrentUser() user: User, @Param('post_id') post_id: string, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(user, post_id, createCommentDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
  async findAll(@Param('post_id') post_id: string, @Query() queryCommentDto: QueryCommentDto) {
    return this.commentsService.findAll(post_id, queryCommentDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
  async findOne(@Param('post_id') post_id: string, @Param('id') id: string) {
    return this.commentsService.findOne(post_id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Endpoint that requires authentication.' }) 
  async update(@CurrentUser() user: User, @Param('post_id') post_id: string, @Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(user, post_id, id, updateCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Endpoint that requires authentication.' }) 
  async remove(@CurrentUser() user: User, @Param('post_id') post_id: string, @Param('id') id: string) {
    return this.commentsService.remove(user, post_id, id);
  }
}
