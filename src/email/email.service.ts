import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(to:string,subject:string, message:string) {
    this.mailService.sendMail({
      from: process.env.EMAIL_USERNAME,
      to,
      subject,
      html: message,
    });
  }
}
