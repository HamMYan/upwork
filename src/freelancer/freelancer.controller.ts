import { RoleGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Role } from './../user/entities/role-enum';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { FreelancerService } from './freelancer.service';
import { Response } from 'express';

class Update {
  skill: string;
}
@ApiTags('Freelancer')
@Controller('freelancer')
export class FreelancerController {
  constructor(private readonly freelancerService: FreelancerService) {}

  @Get()
  findAll() {
    return this.freelancerService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.FREELANCER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('seeDonedWorks')
  async seeDonedWorks(@Req() req, @Res() res:Response) {
    try {
      const data =await this.freelancerService.seeDonedWorks(req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }
  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.FREELANCER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('seeDonedWorks')
  async seeApplys(@Req() req, @Res() res:Response) {
    try {
      const data =await this.freelancerService.seeApplys(req.user.id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancerService.findOne(id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        skill: { type: 'string' },
      },
    },
  })
  @Patch('addSkills/:id')
  addSkills(@Param('id') skillid: string, @Req() req,@Res() res:Response) {
    return this.freelancerService.addSkills(skillid, req.user.id);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        skill: { type: 'string' },
      },
    },
  })
  @Patch()
  update(@Body() obj: Update, @Req() req, @Res() res:Response) {
    try {
      const data = this.freelancerService.update(req.user.id, obj.skill);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }
}
