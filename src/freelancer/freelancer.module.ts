import { Module } from '@nestjs/common';
import { FreelancerService } from './freelancer.service';
import { FreelancerController } from './freelancer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FreelancerSchema } from './entities/freelancer.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Freelancer', schema: FreelancerSchema}])],
  controllers: [FreelancerController],
  providers: [FreelancerService],
})
export class FreelancerModule {}
