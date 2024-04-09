import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/schemas/auth/admin.schemas';
import { adminDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { tokenDto } from './dto/toke.dto';
import { passwordDto } from 'src/user/dto/password.dto';


@Injectable()
export class AdminService {
    constructor(@InjectModel(Admin.name) private Admin: Model<Admin>, private jwt: JwtService) {}


    async signup(data: adminDto) {
        const isHave = await this.checkAdmin(data.username)
        if(isHave) {
            throw new BadRequestException('Admin is already exist')
        }

        const hash = bcrypt.hashSync(data.password, 9)
        const admin = new this.Admin({username: data.username, password: hash})

        await admin.save()
        return this.issueTokens(admin.id)
    }

    async signin(data: adminDto) {
        const isHave = this.checkAdmin(data.username)
        if(!isHave) {
            throw new BadRequestException('Admin is not found')
        }
        const admin = await this.Admin.findOne({username: data.username})

        const isPassword = bcrypt.compareSync(data.password, admin.password)
        if(!isPassword) {
            throw new BadRequestException('Password is not correct')
        }
    
        return await this.issueTokens(admin.id)
    }

     async refresh(data: tokenDto) {
        try {
            const valid = await this.jwt.verifyAsync(data.refreshToken)
            await this.checkAdmin(valid.id)

            return this.issueTokens(valid.id)
        } catch(error) {
          throw new BadRequestException('Token is not valid')
      }
    }


    
    async changePass(id: string, data: passwordDto) {
        const admin = await this.Admin.findById(id) 
        
        const oldP = admin.password
        const compare = bcrypt.compareSync(data.oldPassword, oldP)
        
        if(!compare) {
            throw new BadRequestException('Password is not correct')
        }
        
        const hash = bcrypt.hashSync(data.newPassword, 7)
        admin.password = hash

        await admin.save()
        return 'Password is changed Successfully'
    }


    async getprofile(id: string) {
        console.log('asa', id)
        

        // const ad = await this.Admin.findById(id)
        // if(!ad) {
        //     throw new NotFoundException('Admin is not found')
        // }

        // return ad
    }



    private async issueTokens(userId: string) {
        const data = {id: userId}

        const refreshToken = this.jwt.sign(data, {
            expiresIn: '3d'
        })

        const accessToken = this.jwt.sign(data, {
            expiresIn: '1h'
        })

        return {refreshToken, accessToken}
    }

    private async checkAdmin(username: string) {
        const admin = await this.Admin.findOne({username})
        return admin
    }
}
 