import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarService } from './car.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { carDto } from './dto/car.dto';
import { Auth } from 'src/auth/guards/auth.decorator';
import { User } from 'src/auth/decorators/user.decorator';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';


@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post('create')
  @Auth()
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'images', maxCount: 5},
  ]))
  @UsePipes(new ValidationPipe())
  writeFile(@User('id') id: string, @UploadedFiles() files, @Body() data: carDto) {
    const {images} = files
    const f1 = images[0]
    const f2 = images[1]
    const f3 = images[2]
    const f4 = images[3]
    const f5 = images[4]

    return this.carService.writeFile(id, data, f1, f2, f3, f4, f5)
  }

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(200000)
  @Get()
  getCars() {
    return this.carService.getCars()
  }

  @Get(':id')
  @Auth()
  getById(@User('id') id: string,@Param('id') ids: string) {
    return this.carService.getById(id, ids)
  }

  @Delete(':id')
  @Auth()
  deleteCar(@User('id') id: string, @Param('id') ids: string) {
    return this.carService.deleteCar(id, ids)
  }


  @Post(':id/applicate')
  @Auth()
  applicateToCar(@User('id') id: string, @Param('id') ids: string) {
    return this.carService.applicateToCar(id, ids)
  }

  @Post(':id/like')
  @Auth()
  likeCar(@User('id') id: string, @Param('id') ids: string) {
    return this.carService.likeCar(id, ids)
  }

  @Post(':id/dislike')
  @Auth()
  dislikeCar(@User('id') id: string, @Param('id') ids: string) {
    return this.carService.dislikeCar(id, ids)
  }

  @Get(':id/applications')
  // @Auth()
  getApplications(@User('id') id: string, @Param('id') ids: string) {
    return this.carService.getApplications(id, ids)
  }
}
