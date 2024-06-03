import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Freelancer } from './entities/freelancer.entity';
import { Model } from 'mongoose';
import { Skill } from 'src/skill/entities/skill.entity';
import e from 'express';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FreelancerService {
  constructor(
    @InjectModel('Freelancer') private freelancerModel: Model<Freelancer>,
    @InjectModel('Skill') private skillModel: Model<Skill>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}
  async findAll() {
    return await this.freelancerModel.find().populate('user').exec();
  }

  async findOne(id: string) {
    const freelancer = await this.freelancerModel.findById(id);
    if (freelancer) {
      return await this.freelancerModel.findById(id).populate('user');
    } else {
      throw new NotFoundException('Freelancer not found');
    }
  }

  async update(id, skillId: string) {
    const skill = this.skillModel.findOne({ where: { id: skillId } });
    const user = await this.userModel.findOne({ id });
    if (user) {
      if (skill) {
        const freelancer = await this.freelancerModel.findOne({ user });
        if(freelancer){
          await this.freelancerModel.findByIdAndUpdate(freelancer, {
            skills: [...freelancer.skills, skill],
          });
        }
        else{
          throw new NotFoundException('Freelancer not found');
        }
      } else {
        throw new NotFoundException('Skill not found');
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
