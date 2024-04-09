import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Otp {
    @Prop({unique: true})
    phone: string

    @Prop()
    code: string
}

export const OtpChema = SchemaFactory.createForClass(Otp)