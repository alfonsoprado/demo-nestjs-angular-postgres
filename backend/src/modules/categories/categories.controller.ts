import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import QueryCategoryDto from './dto/query-category.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entities/user.entity';
import { Public } from 'src/decorators/public.decorator';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
  async findAll(@Query() queryCategoryDto: QueryCategoryDto) {
    return this.categoriesService.findAll(queryCategoryDto);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Public endpoint, no authentication required.' }) 
  async findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
