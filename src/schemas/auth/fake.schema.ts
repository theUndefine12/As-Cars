import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class FakeUser {
    @Prop({required: true, unique: true})
    username: string

    @Prop({required: true, unique: true})
    phone: string

    @Prop({required: true})
    password: string
}

export const FakeSchema = SchemaFactory.createForClass(FakeUser)
