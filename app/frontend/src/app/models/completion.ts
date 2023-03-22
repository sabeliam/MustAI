import { Observable } from 'rxjs';
import { CreateCompletionResponse } from 'openai';

export interface Completion {
    getResponse(ask: string): Observable<CreateCompletionResponse>;
}
