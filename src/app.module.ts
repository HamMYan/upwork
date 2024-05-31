import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { CustomerModule } from './customer/customer.module';
import { SkillModule } from './skill/skill.module';
import { WorkModule } from './work/work.module';



@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/upwork'), 
  AuthModule,
  UserModule,
  FreelancerModule,
  CustomerModule,
  SkillModule,
  WorkModule, 
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
