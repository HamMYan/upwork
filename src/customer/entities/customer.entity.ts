import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/entities/user.entity";
import { Work } from "src/work/entities/work.entity";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
    //Works that the customer has added
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Work' }] })
    works: Work[]
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
