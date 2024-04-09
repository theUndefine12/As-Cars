import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Applicate, applicationSchema } from 'src/schemas/applicant.schema';
import { Admin, AdminSchema } from 'src/schemas/auth/admin.schemas';

@Module({
  imports: [
     MongooseModule.forFeature([{name: User.name, schema: UserSchema}, {name: Applicate.name, schema: applicationSchema},
     {name: Admin.name, schema: AdminSchema}
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class UserModule {}
