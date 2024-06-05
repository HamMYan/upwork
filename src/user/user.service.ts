import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { ForGetPassword, UpdateUserDto, UpdatePassword } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';
import { Role } from './entities/role-enum';
import * as bcrypt from 'bcrypt';
import { Freelancer } from 'src/freelancer/entities/freelancer.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Freelancer') private freelancerModel: Model<Freelancer>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    private readonly emailService: EmailService
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

    const message = `<h1>Hello dear ${name}</h1> please click for verify
     <a href='http://localhost:3000/auth/verify?email=${email}&emailToken=${emailToken}'>Verify</a>`

    await this.emailService.sendMail('hammkrtchyan7@gmail.com','Shnorhakalutyun mer kayqum grancvelu hamar',message)

    if(role==Role.COSTUMER){
      const customer = await this.customerModel.create({user:us})
      await this.userModel.findByIdAndUpdate(us._id, {customer})
    }else  if(role==Role.FREELANCER){
      const freelancer = await this.freelancerModel.create({user:us})
      await this.userModel.findByIdAndUpdate(us._id, {freelancer})
    }
    return us;
  }
  async isVeryfy(email:string,emailToken:string){
    const user = await this.userModel.findOne({email, emailToken})
    if(user){
      await this.userModel.findByIdAndUpdate(user,{
        isVerify: 1,
        emailToken: null
      })
      return {message: 'Veryfy succes'}
    }else{
      throw new NotFoundException('User not found')
    }
  }

  async forgetPassword(email:string){
    const user = await this.userModel.findOne({email})
    if(user){
      const code = Math.floor(Math.random() * 90000 + 10000)
      await this.userModel.findByIdAndUpdate(user,{
        emailToken: code
      })
      this.emailService.sendMail('hammkrtchyan7@gmail.com','Forget password',`${email} your code - ${code}`)
      return 'We send your mail virification code'
    }else{
      throw new NotFoundException('User not found')
    }
  }

  async resetPassword(email:string,forGetPassword:ForGetPassword){
    const {code,newPassword,confirmPassword} = forGetPassword
    const user = await this.userModel.findOne({email, emailToken:code})
    if(user){
      if(newPassword == confirmPassword){
        await this.userModel.findByIdAndUpdate(user,{
          emailToken: null,
          password:bcrypt.hashSync(newPassword, 10)
        })
        return 'Your password changed'
      }  else{
        throw new BadRequestException('new password and coniform password is not')
      }  
    }else{
      throw new NotFoundException('User not found')
    }
  }

  async updatePassword(id: string, updatePassword: UpdatePassword) {
    const user = await this.userModel.findById(id);
    if (user) {
      const { oldPassword, newPassword, confirmPassword } = updatePassword
      if (bcrypt.compareSync(oldPassword, user.password)) {
        if (newPassword == confirmPassword) {
          await this.userModel.findByIdAndUpdate(id, { password: bcrypt.hashSync(newPassword, 10) })
          return true
        }
        throw new BadRequestException('Password and confirmPassword do not match!')
      }
      throw new BadRequestException('Wrong old password!')
    }
    throw new NotFoundException('User not found!')
  }

  async updatePicUrl(id: string, picUrl: string) {
    const user = await this.userModel.findById(id);
    if (user) {
      await this.userModel.findByIdAndUpdate(id, { picUrl })
      return true
    }
    throw new NotFoundException('User not found!')
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
    const user = await this.userModel.findById(id);
    if (user) {
      const { name, surname, age, phone, salary} = updateUserDto
      if(salary && user.role == Role.FREELANCER) {
        await this.freelancerModel.findByIdAndUpdate(id, { salary })
      }
      await this.userModel.findByIdAndUpdate(id, { name, surname, age, phone })
      return true
    }
    throw new NotFoundException('User not found!')
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
