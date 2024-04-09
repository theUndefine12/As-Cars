import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { Car } from "./car.schemas";




@Schema()
export class Applicate {
    @Prop({default: 0})
    carsCount: number
    
    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Car'}])
    cars: Car[]

    @Prop({type: Types.ObjectId, ref: 'User'})
    userId: Types.ObjectId
}

export const applicationSchema = SchemaFactory.createForClass(Applicate)

