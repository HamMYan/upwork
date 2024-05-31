import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from "src/customer/entities/customer.entity";
import { Freelancer } from "src/freelancer/entities/freelancer.entity";
import {Role} from './role-enum'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
    _id: number
    @Prop()
    name: string
    @Prop()
    surname:string
    @Prop()
    age:number
    @Prop()
    phone:string
    @Prop()
    email:string
    @Prop()
    password:string
    @Prop()
    isVerify:number
    @Prop()
    emailToken:string
    @Prop()
    role: Role
    @Prop()
    picUrl: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' })
    freelancer: Freelancer

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
    customer: Customer
}

export const UserSchema = SchemaFactory.createForClass(User)