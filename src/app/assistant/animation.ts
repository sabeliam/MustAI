import {
    animate,
    query,
    stagger,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { TuiDropdownAnimation } from '@taiga-ui/core/enums';

const TRANSITION = `{{duration}}ms ease-in-out`;
const DURATION = { params: { duration: 300 } };
const STAGGER = 300;

export interface TuiDurationOptions {
    value: string;
    params: { duration: number };
}

export const tuiFadeInList = trigger(`tuiFadeInList`, [
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
