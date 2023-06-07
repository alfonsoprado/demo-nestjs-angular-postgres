import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmailTemplatesService } from './email-templates.service';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import QueryEmailTemplateDto from './dto/query-email-template.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/entities/user.entity';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('email-templates')
@ApiTags('Email Templates')
export class EmailTemplatesController {
  constructor(private readonly emailTemplatesService: EmailTemplatesService) {}

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async create(@Body() createEmailTemplateDto: CreateEmailTemplateDto) {
    return this.emailTemplatesService.create(createEmailTemplateDto);
  }

  @Roles(Role.Admin)
	@Get()
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
	async findAll(@Query() queryEmailTemplateDto: QueryEmailTemplateDto) {
		return this.emailTemplatesService.findAll(queryEmailTemplateDto);
	}

  @Roles(Role.Admin)
  @Get(':id')
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async findOne(@Param('id') id: string) {
    return this.emailTemplatesService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async update(@Param('id') id: string, @Body() updateEmailTemplateDto: UpdateEmailTemplateDto) {
    return this.emailTemplatesService.update(id, updateEmailTemplateDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Endpoint that can only be used by user with admin role.' }) 
  async remove(@Param('id') id: string) {
    return this.emailTemplatesService.remove(id);
  }
}
