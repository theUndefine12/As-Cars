import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schemas';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { FakeUser } from 'src/schemas/auth/fake.schema';
import { SmsService } from 'src/eskiz/eskiz.service';
import { otpDto } from './dto/otp.dto';
import { Otp } from 'src/schemas/auth/otp.schemas';
import { tokenDto } from './dto/toke.dto';
import { Admin } from 'src/schemas/auth/admin.schemas';
import { Applicate } from 'src/schemas/applicant.schema';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private User: Model<User>,
    private jwt: JwtService, @InjectModel(FakeUser.name) private FakeUser: Model<FakeUser>,
    private SmsService: SmsService, @InjectModel(Otp.name) private Otp: Model<Otp>,
    @InjectModel(Admin.name) private Admin: Model<Admin>,
    @InjectModel(Applicate.name) private Applicate: Model<Applicate>) {}


    async getAll() {
        const users = await this.User.find()

        return users
    }

    async signUp(data: AuthDto) {
        const isHave = await this.FakeUser.findOne({
            $or: [
                {username: data.username},
                {phone: data.phone}
            ]
        })
        if(isHave) {
            throw new BadRequestException('User is already exist')
        }

        const hash = bcrypt.hashSync(data.password, 7)
        const fakeUser = new this.FakeUser({username: data.username, phone: data.phone, password: hash})

        await this.SmsService.sendSMS(data.phone)
        await fakeUser.save()
        return 'Go through Verify phone'
    }

    async otp(data: otpDto) {
        const otp = await this.Otp.findOne({phone: data.phone}) 
        if(!otp) {
            throw new BadRequestException('User is not defind')
        }

        const isPassword = otp.code === data.code
        if(!isPassword) {
            throw new BadRequestException('Code is not correct')
        }

        await this.Otp.findByIdAndDelete(otp.id)
        return this.addNewUser(data.phone)
    }
 
    async signIn(data: AuthDto) {
        const user = await this.User.findOne({phone: data.phone})
        if(!user) {
            throw new BadRequestException('User is not Authorized')
        }

        const isPassword = bcrypt.compareSync(data.password, user.password)
        if(!isPassword) {
            throw new BadRequestException('Password is not correct')
        }

        return await this.issueTokens(user.id)
    }

    async refresh(data: tokenDto) {
        try {
            const valid = await this.jwt.verifyAsync(data.refreshToken)
            await this.getUser(valid.id)

            return this.issueTokens(valid.id)
        } catch(error) {
          throw new BadRequestException('Token is not valid')
      }
    }
    


    private async getUser(id: string) {
        const user = await this.User.findById(id)
        if(!user) {
            throw new BadRequestException('User is not found')
        }

        return user
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

    private async addNewUser(phone: string) {
        const fake = await this.FakeUser.findOne({phone})
        if(!fake) {
            throw new NotFoundException('The Fake datas of user is not found')
        }

        const user = new this.User({username: fake.username, phone: fake.phone, password: fake.password})
        await user.save()

        const apl = new this.Applicate({owner: user.id})
        await apl.save()

        await this.FakeUser.findByIdAndDelete(fake.id)
        return this.issueTokens(user.id)
    }
}
