import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
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
    const newWork = await this.workService.create(createWorkDto, req.user.id);
    return newWork;
  }

  @Get()
  findAll() {
    return this.workService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res:Response) {
    try {
      const data = await this.workService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWorkDto: UpdateWorkDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.workService.update(id, updateWorkDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.FREELANCER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('applyWork/:id')
  async applyWork(@Param('id') id: string, @Req() req, @Res() res: Response) {
    try {
      const data = await this.workService.applyWork(id, req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('doneApply/accept')
  async doneApply(
    @Body() updateFreelancer: UpdateFreelancer,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.workService.doneWork(updateFreelancer, req.user);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('cancelApply/')
  async cancelApply(
    @Body() updateFreelancer: UpdateFreelancer,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.workService.cancelWork(updateFreelancer, req.user);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }
  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.COSTUMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async delete(@Param('id') id:string, @Res() res:Response) {
    try {
      const data = await this.workService.delete(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }
}
