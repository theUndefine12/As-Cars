import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { FileModule } from 'src/file/file.module';
import { Car, CarSchema } from 'src/schemas/car.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schemas';
import { Admin, AdminSchema } from 'src/schemas/auth/admin.schemas';
import { User, UserSchema } from 'src/schemas/user.schemas';

@Module({
  imports: [FileModule, MongooseModule.forFeature([{name: Car.name, schema: CarSchema},
  {name: Category.name, schema: CategorySchema}, {name: Admin.name, schema: AdminSchema},
  {name: User.name, schema: UserSchema}])],
  controllers: [CarController],
  providers: [CarService],
})

export class CarModule {}
