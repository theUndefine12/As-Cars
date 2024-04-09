import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { passwordDto } from './dto/password.dto';
import * as bcrypt from 'bcrypt'
import { Applicate } from 'src/schemas/applicant.schema';
import { Admin } from 'src/schemas/auth/admin.schemas';


@Injectable()
export class UserService {
    constructor(
         @InjectModel(User.name) private User: Model<User>,
         @InjectModel(Applicate.name) private Applicate: Model<Applicate>,
         @InjectModel(Admin.name) private Admin: Model<Admin>
    ) {}


    async users(id: string) {
        await this.cehchAdmin(id)

        const users = await this.User.find()
        return users
    }

    async profile(id: string) {
        const user = await this.User.findById(id)
        .select('-password -applications')

        return user
    }

    async applications(id: string) {
        const user = await this.getById(id)

        const apl = await this.Applicate.findOne({userId: user.id})
        .populate({path: 'cars', select: 'id title images price views'})
        .select('-userId')
        if(!apl) {
            throw new NotFoundException('Applicate is not found')
        }

        return apl
    }

    async changePassword(id: string, data: passwordDto) {
        const user = await this.getById(id)

        const oldP = user.password
        const compare = bcrypt.compareSync(data.oldPassword, oldP)

        if(!compare) {
            throw new BadRequestException('Password is not correct')
        }

        const hash = bcrypt.hashSync(data.newPassword, 7)
        user.password = hash

        await user.save()
        return 'Password is changed Successfully'
    }


    private async getById(id: string) {
        const user = await this.User.findById(id)
        if(!user) {
            throw new BadRequestException('User is not found')
        }

        return user   
    }

    private async cehchAdmin(id: string) {
        const admin = await this.Admin.findById(id)
        if(!admin) {
            throw new BadRequestException('Admin is not found')
        }

        return admin
    }

}
