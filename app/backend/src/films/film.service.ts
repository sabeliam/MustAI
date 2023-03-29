import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CommentDTO, Film, FilmDTO, IFilm} from './film.schema';
import {User} from '../user/user.schema';

@Injectable()
export class FilmsService {
    constructor(
        @InjectModel(Film.name) private readonly filmModel: Model<Film>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {
    }

    async addFilmToUser(userId: string, film: IFilm): Promise<Film> {
        const filmModel = await this.filmModel.create({...film, user: userId});

        await this.userModel.findByIdAndUpdate(userId, {$addToSet: {films: filmModel._id}});
        return filmModel;
    }

    async editFilm(filmId, film: Partial<FilmDTO>) {
        return this.filmModel.findOneAndUpdate({filmId}, film)
    }

    async removeFilmFromUser(userId: string, filmId: string): Promise<void> {
        const film = await this.filmModel.findOne({filmId})

        await this.filmModel.findByIdAndRemove(film._id);
        await this.userModel.findByIdAndUpdate(userId, {$pull: {films: film._id}});
    }

    async getFilmsByUser(userId: string): Promise<Film[]> {
        return this.filmModel.find({user: userId}).exec()
    }
}
