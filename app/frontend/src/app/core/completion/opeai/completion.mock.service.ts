import { Injectable } from '@angular/core';
import { Completion } from '@models';
import { mapTo, Observable, timer } from 'rxjs';
import { CreateCompletionResponse } from 'openai';
import { mockResponse } from '../../../../mocks/index';

@Injectable()
export class MockCompletionService implements Completion {
    getResponse(ask: string): Observable<CreateCompletionResponse> {
        return timer(1000).pipe(mapTo(mockResponse));
    }
}
