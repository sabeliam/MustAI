import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {FilmsService} from './film.service';
import {Film, FilmDTO, IFilm} from './film.schema';

const fromDTOFilm = (film: FilmDTO): IFilm => ({
    filmId: film.id,
    filmName: film.name,
    imgUrl: film.imgUrl,
    description: film.description,
    comments: film.comments
})

const toDTOFilm = (film: IFilm): FilmDTO => ({
    id: film.filmId,
    name: film.filmName,
    imgUrl: film.imgUrl,
    description: film.description,
    comments: film.comments
})

@Controller('api/films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('list')
    async getFilms(@Req() req): Promise<FilmDTO[]> {
        const {_id: sub} = req.user;
        const films: Film[] = await this.filmsService.getFilmsByUser(sub)

        return films.map(toDTOFilm)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    @HttpCode(204)
    async addFilm(@Req() req, @Body() body: FilmDTO) {
        const {_id: sub} = req.user; // sub содержит идентификатор пользователя из токена JWT
        return this.filmsService.addFilmToUser(sub, fromDTOFilm(body));
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete('remove/:filmId')
    async removeFilm(@Req() req, @Param('filmId') filmId: string) {
        const {_id: sub} = req.user; // sub содержит идентификатор пользователя из токена JWT
        return this.filmsService.removeFilmFromUser(sub, filmId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Patch('edit/:filmId')
    async editFilm(
        @Param('filmId') filmId: string,
        @Body() body: Partial<FilmDTO>,
    ) {
        const updatedFilm = await this.filmsService.editFilm(
            filmId,
            body,
        );
        return {
            message: 'Film updated successfully',
            film: updatedFilm,
        };
    }
}
