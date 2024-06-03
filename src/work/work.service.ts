import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateFreelancer, UpdateWorkDto } from './dto/update-work.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Work } from 'src/work/entities/work.entity';
import { User } from 'src/user/entities/user.entity';
import { Skill } from 'src/skill/entities/skill.entity';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectModel('Work') private workModel: Model<Work>,
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Skill') private skillModel: Model<Skill>,
    @InjectModel('Freelancer') private freelancerModel: Model<Freelancer>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
  ) {}

  async create(createWorkDto: CreateWorkDto, id: string) {
    const us = await this.userModel.findById(id);
    if (us) {
      const { skills } = createWorkDto;
      const skill = await this.skillModel.findOne({ where: { id: skills } });
      if (skill) {
        const newWork = await this.workModel.create({
          ...createWorkDto,
          customer: us,
        });
        return newWork.save();
      } else {
        throw new NotFoundException('Skill not found');
      }
    } else {
      throw new NotFoundException('User is undefined');
    }
  }

  async findAll() {
    return await this.workModel.find().exec();
  }

  async findOne(id: string) {
    const work = await this.workModel.findById(id).exec();
    if (!work) {
      throw new NotFoundException(`Work with id ${id} not found`);
    }
    return work;
  }

  async update(id: string, updateWorkDto: UpdateWorkDto) {
    const updatedWork = await this.workModel.findByIdAndUpdate(
      id,
      updateWorkDto,
      {
        new: true,
      },
    );
    if (!updatedWork) {
      throw new NotFoundException(`Work with id ${id} not found`);
    }
    return updatedWork;
  }
  async applyWork(id, userId: string) {
    const work = await this.workModel.findOne(id);
    const user = await this.userModel.findOne({ where: { id: userId } });
    if (work) {
      if (user) {
        const freelancer = await this.freelancerModel.findOne({ user });
        if (freelancer) {
          await this.workModel.findByIdAndUpdate(work, {
            apply: [...work.apply, freelancer],
          });

          await this.freelancerModel.findByIdAndUpdate(freelancer, {
            apply: [...freelancer.apply, work],
          });
        } else {
          throw new NotFoundException('Freelancer not found');
        }
      } else {
        throw new NotFoundException('User not found');
      }
    } else {
      throw new NotFoundException('Work not found');
    }
  }
  async doneWork(updateFreelancer: UpdateFreelancer, user: User) {
    const customer = await this.customerModel.findOne({ user });
    if (customer) {
      const { freelancerId, workId } = updateFreelancer;
      const work = await this.workModel.findOne({ _id: workId });
      if (work) {
        const freelancer = await this.freelancerModel.findOne({ _id: freelancerId });
        if (freelancer) {
          return await this.workModel.findByIdAndUpdate(
            work,
            {
              freelancer,
              apply:[]
            }
          )
         
        }else {
          throw new NotFoundException('freelancer not found')
        }
      }else {
        throw new NotFoundException('work not found')
      }
    } else {
      throw new NotFoundException('customer not found')
    }
  }
  async cancelWork(updateFreelancer: UpdateFreelancer, user: User) {
    const customer = await this.customerModel.findOne({ user });
    if (customer) {
      const { freelancerId, workId } = updateFreelancer;
      const work = await this.workModel.findOne({ _id: workId });
      if (work) {
        const freelancer = await this.freelancerModel.findOne({ _id: freelancerId });
        if (freelancer) {
          return await this.workModel.findByIdAndUpdate(
            work,
            {
              apply:[...work.apply.filter(elm => elm!=freelancer)]
            }
          )
         
        }else {
          throw new NotFoundException('freelancer not found')
        }
      }else {
        throw new NotFoundException('work not found')
      }
    } else {
      throw new NotFoundException('customer not found')
    }
  }
}
