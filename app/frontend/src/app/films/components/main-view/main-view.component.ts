import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FilmsState } from '../../store/films.state';
import { Observable, BehaviorSubject, tap, switchMap } from 'rxjs';
import { Film } from '@models';
import { RemoveFilm } from '../../store/films.actions';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import {
    TuiAlertService,
    TuiDialogService,
    TuiNotification,
} from '@taiga-ui/core';
import { TUI_PROMPT } from '@taiga-ui/kit';
import { filter } from 'rxjs/operators';

interface View {
    value: ViewType;
    icon: string;
    label: string;
}

export enum ViewType {
    List,
    Cards,
    Table,
}

@Component({
    selector: 'app-main-view',
    templateUrl: './main-view.component.html',
    styleUrls: ['./main-view.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainViewComponent {
    // @Select(CommentsState.filmList) public filmList$: Observable<Film[]>;
    // @Input() public filmList: Film[] = [];
    // @Input() public currentViewType: ViewType | null = ViewType.Cards;

    readonly prompt = this.dialogService.open<boolean>(TUI_PROMPT, {
        label: 'Are you sure?',
        size: 's',
        closeable: false,
        dismissible: false,
        data: {
            content: 'film will be deleted',
        },
    });

    @Output() public deleteClick = new EventEmitter<string>();
    @Output() public cardClick = new EventEmitter<string>();
    // public currentViewType$ = new BehaviorSubject<ViewType>(ViewType.Cards);
    public viewType = ViewType;
    input = new FormControl<string>('');
    @Select(FilmsState.filmList) public filmList$: Observable<Film[]>;
    dropdownOpen = false;
    items: View[] = [
        {
            value: ViewType.List,
            icon: 'tuiIconListLarge',
            label: 'Список',
        },
        {
            value: ViewType.Cards,
            icon: 'tuiIconCreditCardLarge',
            label: 'Карточки',
        },
    ];
    // });
    viewType$ = new BehaviorSubject<View>(this.items[0]);

    // viewType = new FormControl<ViewType>(ViewType.Cards, {
    //     nonNullable: true,

    constructor(
        private readonly store: Store,
        private readonly descriptionsService: TmdbClient,
        private readonly router: Router,
        private readonly dialogService: TuiDialogService,
        private readonly tuiAlertService: TuiAlertService
    ) {}

    removeFilm(id: string, event?: Event): void {
        if (event) {
            event.stopPropagation();
        }

        this.prompt
            .pipe(
                filter(Boolean),
                switchMap(() => {
                    return this.store.dispatch(new RemoveFilm(id));
                }),
                switchMap(() => {
                    return this.tuiAlertService.open(`film removed`, {
                        status: TuiNotification.Warning,
                    });
                })
            )
            .subscribe();
    }

    selectViewType(viewType: View): void {
        this.viewType$.next(viewType);
        this.dropdownOpen = false;
    }

    goToDetailed(id: string) {
        this.router.navigate(['library', 'detailed', id]).then();
    }
}
