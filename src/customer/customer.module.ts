import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './entities/customer.entity';
import { WorkSchema } from 'src/work/entities/work.entity';
import { WorkModule } from 'src/work/work.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule { }
