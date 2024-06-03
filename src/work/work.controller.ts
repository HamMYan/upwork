import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req,Res } from '@nestjs/common';
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateFreelancer, UpdateWorkDto } from './dto/update-work.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role-enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { Response } from 'express';


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

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.FREELANCER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('applyWork/:id')
  applyWork(@Param('id') id: string, @Req() req, @Res() res:Response) {
    try{
      const data = this.workService.applyWork(id,req.user.id);
      return res.status(HttpStatus.OK).json(data);
    }catch(err){
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('doneApply/')
  doneApply(@Body() updateFreelancer:UpdateFreelancer,  @Req() req,@Res() res:Response){
    try{
      const data = this.workService.doneWork(updateFreelancer, req.user)
      return res.status(HttpStatus.OK).json(data);
    }catch(err){
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('cancelApply/')
  cancelApply(@Body() updateFreelancer:UpdateFreelancer,  @Req() req,@Res() res:Response){
    try{
      const data = this.workService.cancelWork(updateFreelancer, req.user)
      return res.status(HttpStatus.OK).json(data);
    }catch(err){
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

}
