import {Directive, ElementRef, Output, EventEmitter, OnInit, OnDestroy, Inject} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Subject, fromEvent} from 'rxjs';
import {WINDOW} from '@ng-web-apis/common';

/**
 * Директива, которая вызывает scrollCallback,
 * когда пользователь проскроллит элемент до низа окна браузера
 */
@Directive({
    selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
    @Output('infiniteScroll') scroll = new EventEmitter<void>();

    private destroy$ = new Subject<void>();

    constructor(
        private element: ElementRef,
        @Inject(WINDOW)
        private readonly window: Window) {
    }

    ngOnInit() {
        fromEvent(this.window, 'scroll')
            .pipe(takeUntil(this.destroy$))
            .subscribe(({target}: Event) => this.infiniteScroll(target as Document));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private infiniteScroll(e: Document): void {
        const scrollbar: HTMLElement = e.documentElement;
        const nativeElement: HTMLElement = this.element.nativeElement;
        const elementFullPosition = nativeElement.clientHeight + nativeElement.offsetTop;

        const isElementVisible = elementFullPosition > 0;
        const scrollPosition = scrollbar.scrollTop + scrollbar.clientHeight;

        // добавляем погрешность 2px к текущей позиции скролла, в т.ч. потому, что scrollTop может быть дробным
        if (isElementVisible && (scrollPosition + 2) >= scrollbar.scrollHeight) {
            this.scroll.emit();
        }
    }
}
