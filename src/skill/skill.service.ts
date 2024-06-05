import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(@InjectModel('Skill') private skillModel: Model<Skill>) {}

  async create(createSkillDto: CreateSkillDto) {
    const { name } = createSkillDto;
    return await this.skillModel.create({ name });
  }

  async findAll() {
    return await this.skillModel.find();
  }

  async findById(id: string) {
    const skill = await this.skillModel.findById(id).populate('works')
    if (skill) {
      return skill;
    } else {
      throw new NotFoundException('Skill not found');
    }
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const skill = await this.skillModel.findById(id);
    if (skill) {
      await this.skillModel.findByIdAndUpdate(id, {
        name: updateSkillDto.name,
      });
      return 'Updated';
    } else {
      throw new NotFoundException('Skill not found');
    }
  }

  async remove(id: string) {
    const skill = await this.skillModel.findById(id);
    if (skill) {
      await this.skillModel.findByIdAndDelete(id);
      return 'Deleted';
    } else {
      throw new NotFoundException('Skill not found');
    }
  }
}
