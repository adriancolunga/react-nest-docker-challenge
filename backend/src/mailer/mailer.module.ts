import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailController } from './mailer.controller';
import { MailService } from './mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('SMTPS_HOST'),
          port: configService.get('SMTPS_PORT'),
          secure: configService.get('SMTPS_SECURE'),
          auth: {
            user: configService.get('SMTPS_USER'),
            pass: configService.get('SMTPS_PASSWORD'),
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [],
})
export class MailModule {}
