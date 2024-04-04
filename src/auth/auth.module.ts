import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schemas';
import { Module } from '@nestjs/common';
import { EskizModule } from 'src/eskiz/eskiz.module'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { FakeSchema, FakeUser} from 'src/schemas/auth/fake.schema';
import { Otp, OtpChema } from 'src/schemas/auth/otp.schemas';
import { Admin, AdminSchema } from 'src/schemas/auth/admin.schemas';


@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    EskizModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: FakeUser.name, schema: FakeSchema},
    {name: Otp.name, schema: OtpChema}, {name: Admin.name, schema: AdminSchema}]), 
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ]
})

export class AuthModule {}