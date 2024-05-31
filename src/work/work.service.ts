import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Work } from 'src/work/entities/work.entity';

@Injectable()
export class WorkService {
  constructor(@InjectModel('Work') private workModel: Model<Work>) {}

  async create(createWorkDto: CreateWorkDto, req) {
    const newWork = await this.workModel.create({
      ...createWorkDto,
      userId: req.user.id,
    });

    return newWork.save();
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
    const updatedWork = await this.workModel.findByIdAndUpdate(id, updateWorkDto, {
      new: true,
    });
    if (!updatedWork) {
      throw new NotFoundException(`Work with id ${id} not found`);
    }
    return updatedWork;
  }

  async remove(id: string) {
  }
}
