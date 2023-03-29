import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Schema as MongooseSchema} from 'mongoose';
import {User} from '../user/user.schema';

export interface FilmDTO {
    id: string,
    name: string,
    description: string,
    imgUrl: string,
    comments: CommentDTO[]
}

export interface CommentDTO {
    id: string;
    filmId: string;
    author: string;
    comment: string;
    date: Date;
}

export interface IFilm {
    filmId: string,
    filmName: string,
    description: string,
    imgUrl: string,
    comments: CommentDTO[]
}

@Schema()
export class Film extends Document {
    @Prop()
    filmId: string;

    @Prop()
    filmName: string;

    @Prop()
    description: string;

    @Prop()
    imgUrl: string;

    @Prop()
    comments: CommentDTO[]

    @Prop({type: MongooseSchema.Types.ObjectId, ref: User.name})
    user: User;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
