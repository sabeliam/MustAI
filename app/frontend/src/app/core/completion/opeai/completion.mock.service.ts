import {Injectable} from '@angular/core';
import {Completion} from '@models';
import {mapTo, Observable, timer} from 'rxjs';
import {mockResponse} from '../../../../mocks/index';

@Injectable()
export class MockCompletionService implements Completion {
    getResponse(ask: string): Observable<{ text: string }> {
        return timer(1000).pipe(mapTo({text: mockResponse.choices[0].text || ''}));
    }
}
