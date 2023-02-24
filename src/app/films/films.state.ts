import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Film } from '@models';
import { AddFilm, RemoveFilm } from './films.actions';

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
export class FilmsState {
    @Selector()
    public static filmList(state: FilmsStateModel): Film[] {
        return state.films;
    }

    @Action(AddFilm)
    addFilm(ctx: StateContext<FilmsStateModel>, action: AddFilm) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            films: [...state.films, action.film],
        });
    }

    @Action(RemoveFilm)
    removeFilm(ctx: StateContext<FilmsStateModel>, action: RemoveFilm) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            films: state.films.filter((film) => film.id !== action.id),
        });
    }
}
