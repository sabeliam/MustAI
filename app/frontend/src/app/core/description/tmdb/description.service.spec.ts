import { TestBed } from '@angular/core/testing';

import { TmdbClient } from './tmdb-client.service';
import { MockCompletionService } from '@core/completion/opeai/completion.mock.service';

describe('OpenaiService', () => {
    let service: TmdbClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TmdbClient,
                    useValue: MockCompletionService,
                },
            ],
        });
        service = TestBed.inject(TmdbClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
