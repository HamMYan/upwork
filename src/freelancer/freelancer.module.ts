import { Module } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { FreelancerController } from './freelancer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FreelancerSchema } from './entities/freelancer.entity';
import { SkillSchema } from 'src/skill/entities/skill.entity';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([
    {name: 'Freelancer', schema: FreelancerSchema},
    {name: 'Skill', schema: SkillSchema},
    {name: 'User', schema: UserSchema}
  ])],
  controllers: [FreelancerController],
  providers: [FreelancerService],
})
export class FreelancerModule {}
