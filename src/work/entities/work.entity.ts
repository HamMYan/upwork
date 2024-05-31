import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from "src/user/entities/user.entity";


export type WorkDocument = HydratedDocument<Work>


@Schema()
export class Work {
    _id: number
    @Prop()
    name: string
    @Prop()
    price: number
    @Prop()
    deadline: string
    @Prop()
    description: string
    @Prop()
    skills: []
    @Prop()
    apply:[]

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string
}

export const WorkSchema = SchemaFactory.createForClass(Work)