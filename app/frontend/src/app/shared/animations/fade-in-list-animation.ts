import {
    animate,
    query,
    stagger,
    style,
    transition,
    trigger,
} from '@angular/animations';

const TRANSITION = `{{duration}}ms ease-in-out`;
const DURATION = { params: { duration: 300 } };
const STAGGER = 300;

export interface TuiDurationOptions {
    value: string;
    params: { duration: number };
}

export const fadeInList = trigger(`fadeInList`, [
    transition(
        `* => *`,
        [
            query(
                `:enter`,
                [
                    style({ opacity: 0 }),
                    stagger(STAGGER, [
                        animate(TRANSITION, style({ opacity: 1 })),
                    ]),
                ],
                {
                    optional: true,
                }
            ),
        ],
        DURATION
    ),
]);
