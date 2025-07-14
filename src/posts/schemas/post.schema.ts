import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IPost } from "./models/post.interface";
import mongoose, { HydratedDocument, Model } from "mongoose";

export type PostDocument = HydratedDocument<Posts>
@Schema()
export class Posts implements IPost {
    

    @Prop({type:mongoose.Schema.Types.ObjectId})
    id?: string | undefined;

    @Prop()
    titulo: string;

    @Prop()
    conteudo: string;

    @Prop()
    professor: string;

    @Prop()
    data_criacao: Date;

    @Prop({ default: Date.now })
    data_alteracao?: Date;


}

export const PostSchema = SchemaFactory.createForClass(Posts);