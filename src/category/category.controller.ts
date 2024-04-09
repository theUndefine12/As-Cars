import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { User } from 'src/auth/decorators/user.decorator';
import { categoryDto } from './dto/category.dto';
import { Auth } from 'src/auth/guards/auth.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  
  @Post('create')
  @Auth()
  @UsePipes(new ValidationPipe())
  newCategory(@User('id') id: string, @Body() data: categoryDto) {
    return this.categoryService.create(id, data)
  }

  @Get()
  getCategories() {
    return this.categoryService.getAll()
  } 
  
  @Get(':id')
  getCategory(@Param('id') id: string) {
    return this.categoryService.getOne(id)
  }

  @Put(':id')
  @Auth()
  @UsePipes(new ValidationPipe())
  updateCategory(@User('id') id: string, @Param('ids') ids: string, @Body() data: categoryDto) {
    return this.categoryService.update(id, ids, data)
  }

  @Delete(':id')
  @Auth()
  deleteCategory(@User('id') id: string, @Param('ids') ids: string) {
    return this.categoryService.delete(id, ids)
  }
}
