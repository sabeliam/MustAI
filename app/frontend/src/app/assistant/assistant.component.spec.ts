import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';
import { CompletionService } from '@core/completion/opeai/completion.service';
import { MockCompletionService } from '@core/completion/opeai/completion.mock.service';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import { mock } from 'ts-mockito';

describe('AssistantComponent', () => {
    let component: AssistantComponent;
    let fixture: ComponentFixture<AssistantComponent>;
    let descriptionServiceMock: TmdbClient;

    beforeEach(async () => {
        descriptionServiceMock = mock(TmdbClient);

        await TestBed.configureTestingModule({
            declarations: [AssistantComponent],
            providers: [
                {
                    provide: CompletionService,
                    useValue: MockCompletionService,
                },
                {
                    provide: TmdbClient,
                    useValue: descriptionServiceMock,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AssistantComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
