import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import  { EskizModule } from './eskiz/eskiz.module'
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';
import { CarModule } from './car/car.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { CacheModule } from '@nestjs/cache-manager';
import {redisStore} from 'cache-manager-redis-yet'


@Module({
  imports: [MongooseModule.forRoot('your_mongodb_url'), AuthModule,
  EskizModule,
  ConfigModule.forRoot(),
  UserModule,
  AdminModule,
  CategoryModule,
  CarModule,
  FileModule,
  ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
  CacheModule.register({
      isGlobal: true,
      store: redisStore,
      socket: {
        host: 'redis-stack',
        port: 6379
      }
    })
],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
