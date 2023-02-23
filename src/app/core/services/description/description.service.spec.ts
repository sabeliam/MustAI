import { TestBed } from '@angular/core/testing';

import { DescriptionService } from './description.service';
import { MockCompletionService } from '@core/services/completion/completion.mock.service';

describe('OpenaiService', () => {
    let service: DescriptionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: DescriptionService,
                    useValue: MockCompletionService,
                },
            ],
        });
        service = TestBed.inject(DescriptionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
