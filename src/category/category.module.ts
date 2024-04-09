import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schemas/category.schemas';
import { Admin, AdminSchema } from 'src/schemas/auth/admin.schemas';

@Module({
  imports: [MongooseModule.forFeature([{name: Category.name, schema: CategorySchema}, {name: Admin.name, schema: AdminSchema}])],
  controllers: [CategoryController],
  providers: [CategoryService],
})

export class CategoryModule {}
