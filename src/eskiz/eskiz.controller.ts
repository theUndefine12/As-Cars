import { Controller, Post, Body, Get } from '@nestjs/common';
import { SmsService } from './eskiz.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  async sendSMS(@Body() phoneNumber: string) {
  try {
    await this.smsService.sendSMS(phoneNumber);
    return { success: true, message: 'SMS sent successfully' };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Unknown error' };
  }
}
}
