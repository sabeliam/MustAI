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
        const filmModel = await this.filmModel.create({...film});

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
        const user = await this.userModel.findById(userId).lean().exec();
        if (!user) {
            // Обработка случая, когда пользователь не найден
            return null;
        }

        // Получение фильмов по массиву id из поля films модели User
        const films = await this.filmModel.find({_id: {$in: user.films}}).lean().exec();

        return films;
    }

    async getFilmsByUserByPages(userId: string, pageNumber: number, pageSize: number): Promise<Film[]> {
        const user = await this.userModel.findById(userId).lean().exec();
        if (!user) {
            // Обработка случая, когда пользователь не найден
            return null;
        }

        // Рассчитываем количество фильмов, которые нужно пропустить (skip) и сколько фильмов нужно вернуть (limit)
        const skip = (pageNumber - 1) * pageSize;
        const limit = pageSize;

        // Получение фильмов по массиву id из поля films модели User с использованием skip и limit
        const films = await this.filmModel
            .find({_id: {$in: user.films}})
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        return films;
    }

}
