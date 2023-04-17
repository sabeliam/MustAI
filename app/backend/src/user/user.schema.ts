import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, {Document} from 'mongoose';
import {Film, FilmSchema} from '../films/film.schema';

@Schema()
export class User extends Document {
    @Prop({required: true})
    username: string;

    @Prop({required: true})
    password: string;

    @Prop()
    films: Film[];

    @Prop({required: false})
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
