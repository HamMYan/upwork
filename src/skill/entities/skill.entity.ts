import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';


export type SkillDocument = HydratedDocument<Skill>

@Schema()
export class Skill {
    _id: string
    @Prop()
    name: string
}

export const SkillSchema = SchemaFactory.createForClass(Skill)