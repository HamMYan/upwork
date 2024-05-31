import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Freelancer } from './entities/freelancer.entity';
import { Model } from 'mongoose';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectModel('Freelancer') private freelancerModel: Model<Freelancer>,
  ) {}
  async findAll() {
    return await this.freelancerModel.find().populate('user').exec();
  }

  async findOne(id: string) {
    const freelancer = await this.freelancerModel.findById(id);
    if (freelancer) {
      return await this.freelancerModel
        .findById(id)
        .populate('user')
    } else {
      throw new NotFoundException('Freelancer not found');
    }
  }
}
