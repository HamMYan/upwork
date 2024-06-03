import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose'
import { type } from "os";
import { Customer } from "src/customer/entities/customer.entity";
import { Freelancer } from "src/freelancer/entities/freelancer.entity";
import { Skill } from "src/skill/entities/skill.entity";
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

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId,ref: 'Skill'}]})
    skills: Skill[]

    @Prop({type:[{type: mongoose.Schema.Types.ObjectId,ref: 'Freelancer'}]})
    apply: Freelancer[]
    


    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
    customer: Customer

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer' })
    freelancer: Freelancer
}

export const WorkSchema = SchemaFactory.createForClass(Work)