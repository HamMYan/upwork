import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CreateWorkDto } from 'src/work/dto/create-work.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role-enum';
import { RoleGuard } from 'src/auth/roles.guard';
import { WorkService } from 'src/work/work.service';

@ApiTags("Customer")
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService, private readonly workService: WorkService) {}

  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

}
