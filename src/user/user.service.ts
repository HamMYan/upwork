import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { Role } from './entities/role-enum';
import * as bcrypt from 'bcrypt';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Freelancer') private freelancerModel: Model<Freelancer>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    ) {}
  
  async create(createUserDto: CreateUserDto) {
    const { name, surname, age, email, password, phone, role } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException(email + '- email has arleady');
    }
    if (role == Role.ADMIN) {
      throw new BadRequestException('its role for admin');
    }
    const emailToken = uuid();
    const us = await this.userModel.create({
      name,
      surname,
      age,
      email,
      password:bcrypt.hashSync(password, 10),
      phone,
      role,
      emailToken,
    });

    if(role==Role.COSTUMER){
      const customer = await this.customerModel.create({user:us})
      await this.userModel.findByIdAndUpdate(us._id, {customer})
    }else  if(role==Role.FREELANCER){
      const freelancer = await this.freelancerModel.create({user:us})
      await this.userModel.findByIdAndUpdate(us._id, {freelancer})
    }
    return us;
  }

  async findOneByEmail(username: string){
    return await this.userModel.findOne({email:username});
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
