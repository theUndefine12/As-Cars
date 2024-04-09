import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schemas/category.schemas';
import { categoryDto } from './dto/category.dto';
import { Admin } from 'src/schemas/auth/admin.schemas';


@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private Category: Model<Category>,
    @InjectModel(Admin.name) private Admin: Model<Admin>
    ) {}


    async create(id: string, data: categoryDto) {
        await this.ChechAdmin(id)

        const isHave = await this.Category.findOne({title: data.title})
        if(isHave) {
            throw new BadRequestException('Category is already exist')
        }
        const category = new this.Category({title: data.title})
        await category.save()

        return category
    }

    async getAll() {
        const categories = await this.Category.find()
        return categories
    }


    async getOne(id: string) {
        await this.getById(id)

        const category = await this.Category.findById(id)
        .populate({path: 'cars', select: 'id title images price views'})

        return category
    }

    async update(id: string, ids: string, data: categoryDto) {
        await this.ChechAdmin(id)
        await this.getById(ids)

        const update = await this.Category.findByIdAndUpdate(id, {
            title: data.title
        })

        await update.save()
        return update
    }

    async delete(id: string, ids: string) {
        await this.ChechAdmin(id)
        await this.getById(ids)

        const dl = await this.Category.findByIdAndDelete(ids)
        return 'Category is Deleted !'
    }


    
    private async getById(id: string) {
        const category = await this.Category.findById(id)
        if(!category) {
            throw new BadGatewayException('Category is not found')
        }

        return category
    }

    private async ChechAdmin(id: string) {
        const admin = await this.Admin.findById(id)
        if(!admin) {
            throw new BadRequestException('You are have not right !!')
        }
        
        return admin
    }
}
