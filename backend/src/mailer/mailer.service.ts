import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { MailData } from './interfaces/mail.interface';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendMail({ name, email, message }: MailData) {
    try {
      await this.mailService.sendMail({
        from: email,
        to: this.configService.get('SMTPS_USER'),
        subject: 'Contact',
        text: `
        Name: ${name}
        From: ${email},
        
        ${message}
        `,
      });
    } catch (error) {
      console.log('error ==> ', error);
      throw new BadRequestException(error);
    }
  }
}
