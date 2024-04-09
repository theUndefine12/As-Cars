import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Admin {
    @Prop({unique: true})
    username: string

    @Prop()
    password: string
}

export const AdminSchema = SchemaFactory.createForClass(Admin)