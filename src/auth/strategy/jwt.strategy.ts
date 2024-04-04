import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import {ExtractJwt, Strategy} from 'passport-jwt'
import { User } from "src/schemas/user.schemas";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService,@InjectModel(User.name) private User: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: configService.get('ACC')
        })
    }

    async validate({id}) {
        return await this.User.findById(id)
    }
}