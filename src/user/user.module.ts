import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { FreelancerSchema } from 'src/freelancer/entities/freelancer.entity';
import { CustomerSchema } from 'src/customer/entities/customer.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Freelancer', schema: FreelancerSchema }, 
    { name: 'Customer', schema: CustomerSchema }
])],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService]
})
export class UserModule {}
