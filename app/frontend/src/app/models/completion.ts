import {Observable} from 'rxjs';

export interface Completion {
    getResponse(ask: string): Observable<{ text: string }>;
}
