import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';
import { CompletionService } from '@core/services/completion/completion.service';
import { MockCompletionService } from '@core/services/completion/completion.mock.service';
import { DescriptionService } from '@core/tmdb/description/description.service';
import { mock } from 'ts-mockito';

describe('AssistantComponent', () => {
    let component: AssistantComponent;
    let fixture: ComponentFixture<AssistantComponent>;
    let descriptionServiceMock: DescriptionService;

    beforeEach(async () => {
        descriptionServiceMock = mock(DescriptionService);

        await TestBed.configureTestingModule({
            declarations: [AssistantComponent],
            providers: [
                {
                    provide: CompletionService,
                    useValue: MockCompletionService,
                },
                {
                    provide: DescriptionService,
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
