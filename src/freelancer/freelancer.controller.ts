import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FreelancerService } from './freelancer.service';

@ApiTags('Freelancer')
@Controller('freelancer')
export class FreelancerController {
  constructor(private readonly freelancerService: FreelancerService) {}



  @Get()
  findAll() {
    return this.freelancerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.freelancerService.findOne(id);
  }


}
