import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map, Observable, of, switchMap} from 'rxjs';
import {DescriptionService} from '@core/description/description.service';
import {FormControl} from '@angular/forms';
import {Select, Store} from '@ngxs/store';
import {FilmsState} from '../../store/films.state';
import {Comment, Film} from '@models';
import {AddComment, RemoveComment, UpdateComment} from '../../store/films.actions';
import {v4 as uuidv4} from 'uuid';
import {fadeInList} from '@shared/animations/fade-in-list-animation';
import {TuiAlertService, TuiNotification} from '@taiga-ui/core';

@Component({
    selector: 'app-detailed-view',
    templateUrl: './detailed-view.component.html',
    styleUrls: ['./detailed-view.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeInList],
})
export class DetailedViewComponent {
    animationDisabled = true;
    film$: Observable<Film | null> = this.getCurrentFilm$();
    currentFilmId: string;

    input = new FormControl<string>('');

    @Select(FilmsState.filmList) films$: Observable<Film[]>;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly descriptionService: DescriptionService,
        private readonly tuiAlertService: TuiAlertService,
        private readonly store: Store
    ) {
    }

    getCurrentFilm$(): Observable<Film | null> {
        return this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                const id = params.get('id');

                if (id === null) {
                    this.router.navigateByUrl('library');

                    return of(null);
                }

                this.currentFilmId = id;

                return this.films$.pipe(
                    map((films) => {
                        const film = films.find((film) => film.id === id);

                        this.input.setValue(film?.comments[0]?.comment || '')

                        return film ?? null;
                    })
                );
            })
        );
    }

    addComment() {
        this.animationDisabled = false;
        if (!this.input.value) {
            return;
        }

        const comment = this.input.value;
        //
        // const comment: Comment = {
        //     author: 'Bob',
        //     comment: this.input.value,
        //     date: new Date(),
        //     filmId: this.currentFilmId,
        //     id: uuidv4(),
        // };

        this.store
            .dispatch(new UpdateComment(this.currentFilmId, comment))
            .subscribe(() => {
                // this.input.reset();
                this.tuiAlertService
                    .open(`comment added`, {
                        status: TuiNotification.Success,
                    })
                    .subscribe();
            });
    }

    //
    // deleteComment(commentId: string) {
    //     this.store
    //         .dispatch(new RemoveComment(this.currentFilmId, commentId))
    //         .subscribe(() => {
    //             this.tuiAlertService
    //                 .open(`comment deleted`, {
    //                     status: TuiNotification.Success,
    //                 })
    //                 .subscribe();
    //         });
    // }
}
