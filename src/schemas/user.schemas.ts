import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Car } from "./car.schemas";


@Schema()
export class User {
    @Prop({required: true, unique: true})
    username: string

    @Prop({required: true, unique: true})
    phone: string

    @Prop({required: true})
    password: string

    @Prop({default: 0})
    applicationsCount: number

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }] })
    applications: Car[]
}


export const UserSchema = SchemaFactory.createForClass(User)