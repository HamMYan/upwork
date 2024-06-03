import { SkillSchema } from './../skill/entities/skill.entity';
import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkSchema } from './entities/work.entity';
import { WorkService } from './work.service';
import { UserSchema } from 'src/user/entities/user.entity';
import { FreelancerSchema } from 'src/freelancer/entities/freelancer.entity';
import { CustomerSchema } from 'src/customer/entities/customer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Work', schema: WorkSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Skill', schema: SkillSchema },
      { name: 'Freelancer', schema: FreelancerSchema },
      { name: 'Customer', schema: CustomerSchema }
    ]),
  ],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
