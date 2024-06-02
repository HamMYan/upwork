import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { Work } from "src/work/entities/work.entity";

export type FreelancerDocument = HydratedDocument<Freelancer>;

@Schema()
export class Freelancer {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
    //Works that the freelancer is working at
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }] })
    works: Work[]
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }] })
    apply: Work[]
    @Prop({default: 1000})
    salary: number
}

export const FreelancerSchema = SchemaFactory.createForClass(Freelancer);