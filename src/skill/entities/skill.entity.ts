import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';
import { Work } from "src/work/entities/work.entity";


export type SkillDocument = HydratedDocument<Skill>

@Schema()
export class Skill {
    _id: string
    @Prop()
    name: string
    @Prop({type:[{type: mongoose.Schema.Types.ObjectId,ref: 'Work'}]})
    works: Work[]
}

export const SkillSchema = SchemaFactory.createForClass(Skill)