import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { Admin } from "src/schemas/auth/admin.schemas";
import { User } from "src/schemas/user.schemas";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService,@InjectModel(User.name) private User: Model<User>,
    @InjectModel(Admin.name) private Admin: Model<Admin>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('JWT_SECRET')
        })
    }

    async validate({id}) {
        const user = await this.User.findById(id)
        if(!user) {
            return await this.Admin.findById(id)
        }

        return user
    }
}