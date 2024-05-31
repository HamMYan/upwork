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
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email/email.service';


console.log(process.env.EMAIL_USERNAME);
console.log(process.env.EMAIL_PASSWORD);

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/upwork'), 
  ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  AuthModule,
  UserModule,
  FreelancerModule,
  CustomerModule,
  SkillModule,
  WorkModule, 
  MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  }),
],  
  controllers: [AppController],
  providers: [AppService,  EmailService],
})
export class AppModule {}
