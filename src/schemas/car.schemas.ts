import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Category } from "./category.schemas";


@Schema()
export class Car {
    @Prop({unique: true})
    title: string

    @Prop({default: 'traker.jpg'})
    images: string[]

    @Prop()
    description: string
    
    @Prop()
    price: number

    @Prop({type: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}})
    category: Category

    @Prop({default: 0})
    views: number

    @Prop({default: 0})
    likes: number

    @Prop({default: 0})
    dislikes: number

    @Prop({default: 0})
    applicationsCount: number

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    viewedBy: Types.ObjectId[]

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    likedBy: Types.ObjectId[]

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    dislikedBy: Types.ObjectId[]

    @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
    applications: Types.ObjectId[]
}


export const CarSchema = SchemaFactory.createForClass(Car)
