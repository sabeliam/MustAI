import { InjectionToken } from '@angular/core';

export interface Page {
    readonly title: string;
    readonly route: string;
}

export const NAVIGATION_ITEMS: InjectionToken<readonly Page[]> =
    new InjectionToken<readonly Page[]>(`Navigation pages`);
