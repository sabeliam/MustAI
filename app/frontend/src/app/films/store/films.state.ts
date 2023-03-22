import { Injectable } from '@angular/core';
import { Action, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Film } from '@models';
import { Comment } from '@models/comment';
import {
    AddComment,
    AddFilm,
    GetComments,
    GetFilms,
    RemoveComment,
    RemoveFilm,
    UpdateFilm,
} from './films.actions';
import { FilmsService } from '../services/films.service';
import { tap } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { patch, updateItem } from '@ngxs/store/operators';

interface FilmsStateModel {
    films: Film[];
}

const defaultFilmsState: FilmsStateModel = {
    films: [],
};

@State<FilmsStateModel>({
    name: 'films',
    defaults: defaultFilmsState,
})
@Injectable()
export class FilmsState implements NgxsOnInit {
    constructor(
        private readonly filmsService: FilmsService,
        private readonly tuiAlertService: TuiAlertService
    ) {}

    @Selector()
    public static filmList(state: FilmsStateModel): Film[] {
        return state.films;
    }

    @Selector()
    public static filmById(
        state: FilmsStateModel
    ): (id: string) => Film | null {
        return (id: string) => {
            return state.films.find((film) => film.id === id) || null;
        };
    }

    ngxsOnInit(ctx: StateContext<FilmsStateModel>) {
        console.log('State initialized, now getting films');
        ctx.dispatch(new GetFilms());
    }

    @Action(GetFilms)
    getFilms(ctx: StateContext<FilmsStateModel>) {
        return this.filmsService.getFilms().pipe(
            tap((films) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    films,
                });
            })
        );
    }

    @Action(GetComments)
    getComments(ctx: StateContext<FilmsStateModel>, action: GetComments) {
        return this.filmsService.getComments(action.filmId);
    }

    @Action(AddComment)
    addComment(ctx: StateContext<FilmsStateModel>, action: AddComment) {
        const film = ctx
            .getState()
            .films.find((film) => film.id === action.filmId);

        if (!film) {
            return;
        }

        film.comments.push(action.comment);

        ctx.dispatch(new UpdateFilm(film));
    }

    @Action(RemoveComment)
    removeComment(ctx: StateContext<FilmsStateModel>, action: RemoveComment) {
        const film = ctx
            .getState()
            .films.find((film) => film.id === action.filmId);

        if (!film) {
            return;
        }

        film.comments = film.comments.filter(
            (comment) => comment.id !== action.id
        );

        ctx.dispatch(new UpdateFilm(film));
    }

    @Action(AddFilm)
    addFilm(ctx: StateContext<FilmsStateModel>, action: AddFilm) {
        return this.filmsService.addFilm(action.film).pipe(
            tap(() => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    films: [...state.films, action.film],
                });
            }),
            tap(() => {
                this.tuiAlertService
                    .open(`film added ${action.film.name}`, {
                        status: TuiNotification.Success,
                    })
                    .subscribe();
            })
        );
    }

    @Action(UpdateFilm)
    updateFilm(ctx: StateContext<FilmsStateModel>, action: UpdateFilm) {
        return this.filmsService.patchFilm(action.film).pipe(
            tap(() => {
                ctx.setState(
                    patch({
                        films: updateItem<Partial<Film>>(
                            (item) => item?.id === action.film.id,
                            patch({ ...action.film })
                        ),
                    })
                );
            })
        );
    }

    @Action(RemoveFilm)
    removeFilm(ctx: StateContext<FilmsStateModel>, action: RemoveFilm) {
        return this.filmsService.removeFilm(action.id).pipe(
            tap(() => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    films: state.films.filter((film) => film.id !== action.id),
                });
            })
        );
    }
}
