import {Injectable} from '@angular/core';
import {Completion} from '@models/completion';
import {mapTo, Observable, of, timer} from 'rxjs';
import {mockResponse} from '../../../../mocks/index';

@Injectable()
export class MockCompletionService implements Completion {
    getResponse(ask: string): Observable<any> {
        return timer(1000).pipe(mapTo(mockResponse));
    }
}
