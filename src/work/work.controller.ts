import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role-enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';

@ApiTags('Work')
@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async create(@Body() createWorkDto: CreateWorkDto, @Req() req) {
    const newWork = await this.workService.create(createWorkDto,req.user.id)
    return newWork;
  }

  @Get()
  findAll() {
    return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkDto: UpdateWorkDto) {
    return this.workService.update(id, updateWorkDto);
  }

  @Patch('applyWork/:id') 
  async applyWork(@Param('id') workId:string,@Req() req) {
      return await this.workService.applyWork(workId,req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workService.remove(id);
  }

  
}
