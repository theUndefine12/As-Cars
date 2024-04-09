// app.module.ts

import { Module } from '@nestjs/common';
import { SmsController } from './eskiz.controller'
import { SmsService } from './eskiz.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpChema } from 'src/schemas/auth/otp.schemas';

@Module({
    imports: [ MongooseModule.forFeature([{name: Otp.name, schema: OtpChema}])],
    controllers: [SmsController],
    providers: [SmsService],
    exports: [SmsService]
})

export class EskizModule {}
