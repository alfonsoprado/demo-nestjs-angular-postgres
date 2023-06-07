import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import QueryPostDto from './dto/query-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import User, { Role } from 'src/entities/user.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) {}

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async create(@CurrentUser() user: User, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(user, createPostDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
  async findAll(@Query() queryPostDto: QueryPostDto) {
    return this.postsService.findAll(queryPostDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
