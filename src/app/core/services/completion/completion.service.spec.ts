import { TestBed } from '@angular/core/testing';

import { CompletionService } from './completion.service';
import { MockCompletionService } from '@core/services/completion/completion.mock.service';

describe('OpenaiService', () => {
    let service: CompletionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: CompletionService,
                    useValue: MockCompletionService,
                },
            ],
        });
        service = TestBed.inject(CompletionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
