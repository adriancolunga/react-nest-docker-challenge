import { Body, Controller, Post } from '@nestjs/common';

import { MailData } from './interfaces/mail.interface';
import { MailService } from './mailer.service';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailerService: MailService) {}

  @Post()
  async sendMail(@Body() data: MailData) {
    return await this.mailerService.sendMail(data);
  }
}
