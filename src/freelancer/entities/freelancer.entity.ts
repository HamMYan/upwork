import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Skill } from "src/skill/entities/skill.entity";
import { User } from "src/user/entities/user.entity";
import { Work } from "src/work/entities/work.entity";


export type FreelancerDocument = HydratedDocument<Freelancer>;

@Schema()
export class Freelancer {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }] })
    works: Work[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }] })
    apply: Work[]
    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }]})
    skills: Skill[]
    @Prop({default: 1000})
    salary: number

}

export const FreelancerSchema = SchemaFactory.createForClass(Freelancer);