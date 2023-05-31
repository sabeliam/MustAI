import {Injectable} from '@angular/core';
import {Action, NgxsOnInit, Selector, State, StateContext} from '@ngxs/store';
import {Film} from '@models';
import {Comment} from '@models/comment';
import {
    AddComment,
    AddFilm, ClearStore,
    GetFilms,
    RemoveComment,
    RemoveFilm, SelectCurrentFilm, UpdateComment,
    UpdateFilm,
} from './films.actions';
import {tap} from 'rxjs';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';
import {patch, updateItem} from '@ngxs/store/operators';
import {v4 as uuidv4} from 'uuid';
import {AuthService} from '@core/auth/auth.service';
import {FilmsClientService} from '../services/films-client.service';

interface FilmsStateModel {
    films: Film[];
    selectedFilmId: string | null;
}

const defaultFilmsState: FilmsStateModel = {
    films: [],
    selectedFilmId: null,
};

@State<FilmsStateModel>({
    name: 'films',
    defaults: defaultFilmsState,
})
@Injectable()
export class FilmsState {
    constructor(
        private readonly filmsClientService: FilmsClientService,
        private readonly tuiAlertService: TuiAlertService,
        private readonly authService: AuthService
    ) {
    }

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

    @Selector()
    public static currentFilm(state: FilmsStateModel): Film | null {
        return state.films.find((film) => film.id === state.selectedFilmId) || null;
    }

    @Action(ClearStore)
    clearStore({setState}: StateContext<FilmsStateModel>): FilmsStateModel {
        console.log('clearStore', defaultFilmsState)
        return setState(defaultFilmsState);
    }

    @Action(GetFilms)
    getFilms(ctx: StateContext<FilmsStateModel>) {
        return this.filmsClientService.getFilms().pipe(
            tap((films = []) => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    films,
                });
            })
        );
    }

    // @Action(AddComment)
    // addComment(ctx: StateContext<FilmsStateModel>, action: AddComment) {
    //     const film = ctx
    //         .getState()
    //         .films.find((film) => film.id === action.filmId);
    //
    //     if (!film) {
    //         return;
    //     }
    //
    //     film.comments.push(action.comment);
    //
    //     ctx.dispatch(new UpdateFilm(film));
    // }

    @Action(UpdateComment)
    updateComment(ctx: StateContext<FilmsStateModel>, action: UpdateComment) {
        const state = ctx.getState();
        const film = state.films.find((film) => film.id === state.selectedFilmId);

        if (!film) {
            return;
        }

        let comment: Comment = film.comments[0];

        if (!comment) {
            comment = {
                id: uuidv4(),
                comment: action.comment,
                author: this.authService.currentUserUsername,
                date: new Date(),
                filmId: film.id
            }

            film.comments.push(comment);
        } else {
            comment.comment = action.comment;
            comment.date = new Date();
        }

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
        return this.filmsClientService.addFilm(action.film).pipe(
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
        return this.filmsClientService.patchFilm(action.film).pipe(
            tap(() => {
                ctx.setState(
                    patch({
                        films: updateItem<Partial<Film>>(
                            (item) => item?.id === action.film.id,
                            patch({...action.film})
                        ),
                    })
                );
            })
        );
    }

    @Action(SelectCurrentFilm)
    selectCurrentFilm(ctx: StateContext<FilmsStateModel>, action: SelectCurrentFilm) {
        const state = ctx.getState();

        ctx.setState({
            ...state,
            selectedFilmId: action.filmId,
        });
    }

    @Action(RemoveFilm)
    removeFilm(ctx: StateContext<FilmsStateModel>, action: RemoveFilm) {
        return this.filmsClientService.removeFilm(action.id).pipe(
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
