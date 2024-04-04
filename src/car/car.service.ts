import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileService } from 'src/file/file.service';
import { Car } from 'src/schemas/car.schemas';
import { carDto } from './dto/car.dto';
import { Category } from 'src/schemas/category.schemas';
import { Admin } from 'src/schemas/auth/admin.schemas';
import { User } from 'src/schemas/user.schemas';


@Injectable()
export class CarService {
    constructor(private fileService: FileService, @InjectModel(Car.name) private Car: Model<Car>,
    @InjectModel(Category.name) private Category: Model<Category>,
    @InjectModel(Admin.name) private Admin: Model<Admin>,
    @InjectModel(User.name) private User: Model<User>) {}


    async writeFile(id: string, data: carDto, f1: any, f2?: any, f3?: any, f4?: any, f5?: any) {
        await this.chechAdmin(id)
        
        const w1 = this.fileService.createFile(f1)
        const car = new this.Car({title: data.title, description: data.description, images: w1, price: data.price, category: data.category})
        
        const isCtg = await this.Category.findOne({title: data.category})
        if(!isCtg) {
            throw new NotFoundException('Category is not defind')
        }
        
        if(f2) {
            const w2 = this.fileService.createFile(f1)
            car.images.push(w2)
            await car.save()
        }
        if(f3) {
            const w3 = this.fileService.createFile(f3)
            car.images.push(w3)
            await car.save()
        }
        if(f4) {
            const w4 = this.fileService.createFile(f4)
            car.images.push(w4)
            await car.save()
        }
        if(f5) {
            const w5 = this.fileService.createFile(f5)
            car.images.push(w5)
            await car.save()
        }

        
        isCtg.carsCount += 1
        isCtg.cars.push(car.id)
        
        await isCtg.save()
        return car
    }

    async getCars() {
        const cars = await this.Car.find()
        .select('title images price likes dislikes')

        return cars
    }

    async getById(id: string) {
        const cars = await this.Car.find()
        .select('title images price likes dislikes')

        return cars
    }

    async deleteCar(id: string, ids: string) {
        await this.chechAdmin(id)
        await this.getCarById(ids)

        const dlt = await this.Car.findByIdAndDelete(ids)
        return dlt
    }




    async likeCar(id: string, ids: string) {
        const user = await this.checkUser(id)
        const car = await this.getCarById(ids)

        const isHave = car.likedBy.some(user => user.id)
        if(isHave) {
            const index = car.likedBy.indexOf(user.id)
            
            car.likes -= 1
            car.likedBy.splice(index, 1)

            await car.save()
            return car
        }

        car.likes += 1
        car.likedBy.push(user.id)

        await car.save()
        return car
    }

    async dislikeCar(id: string, ids: string) {
        const user = await this.checkUser(id)
        const car = await this.getCarById(ids)

        const isHave = car.dislikedBy.some(user => user.id)
        if(isHave) {
            const index = car.dislikedBy.indexOf(user.id)
            
            car.dislikes -= 1
            car.dislikedBy.splice(index, 1)

            await car.save()
            return car
        }

        car.dislikes += 1
        car.dislikedBy.push(user.id)

        await car.save()
        return car
    }

    async applicateToCar(id: string, ids: string) {
        const user = await this.checkUser(id)
        const car = await this.getCarById(ids)

        const isHave = car.applications.some(user => user.id)
        if(isHave) {
            const index = car.applications.indexOf(user.id)
            
            car.applicationsCount -= 1
            car.applications.splice(index, 1)

            await car.save()
            return car
        }

        car.applicationsCount += 1
        car.applications.push(user.id)

        await car.save()
        return car
    }

    async getApplications(id: string, ids: string) {
        await this.chechAdmin(id)
        
        const applications = await this.Car.findById(ids)
        .populate('applications').select('applicationsCount applications')

        return applications
    }





    private async getCarById(id: string) {
        const car = await this.Car.findById(id)
        .select('title images price likes dislikes')
        if(!car) {
            throw new NotFoundException('Car is not defind')
        }

        return car
    }


    private async chechAdmin(id: string) {
        const admin = await this.Admin.findById(id)
        if(!admin) {
            throw new BadRequestException('You are have not right for this')
        }

        return admin
    }

    private async checkUser(id: string) {
        const user = await this.User.findById(id)
        return user
    }


}
