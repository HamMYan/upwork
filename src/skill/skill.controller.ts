import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/user/entities/role-enum';
import { HasRoles } from 'src/auth/has-roles.decorator';

@ApiTags('Skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return await this.skillService.create(createSkillDto);
  }

  @Get()
  async findAll() {
    return await this.skillService.findAll();
  }
  @Get('/findById/:id')
  async findById(@Param("id") id: string) {
    return await this.skillService.findById(id);
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ) {
    return await this.skillService.update(id, updateSkillDto);
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.skillService.remove(id);
  }
}
