import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Car } from "./car.schemas";


@Schema()
export class Category {
    @Prop({unique: true})
    title: string

    @Prop({default: 0})
    carsCount: number

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Car'}])
    cars: Car[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)