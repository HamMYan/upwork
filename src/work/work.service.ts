import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Work } from 'src/work/entities/work.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkService {
  constructor(@InjectModel('Work') private workModel: Model<Work>,@InjectModel('User') private userModel: Model<User>) {}

  async create(createWorkDto: CreateWorkDto, id: string) {
    const us = await this.userModel.findById(id);
    if(us){
      const newWork = await this.workModel.create({
        ...createWorkDto,
        user: us,
      });
      return newWork.save();
    }else{
      throw new NotFoundException('User is undefined')
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
  async applyWork(workId: string,id:string){
    return id
  }
  async remove(id: string) {}
}
