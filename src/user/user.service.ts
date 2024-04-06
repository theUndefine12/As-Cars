import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { passwordDto } from './dto/password.dto';
import * as bcrypt from 'bcrypt'
import { Applicate } from 'src/schemas/applicant.schema';


@Injectable()
export class UserService {
    constructor(
         @InjectModel(User.name) private User: Model<User>,
         @InjectModel(Applicate.name) private Applicate: Model<Applicate>) {}

    async profile(id: string) {
        const user = await this.User.findById(id)
        .select('-password -applications')

        return user
    }

    async applications(id: string) {
        const user = await this.getById(id)

        const apl = await this.Applicate.findOne({userId: user.id})
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

}
