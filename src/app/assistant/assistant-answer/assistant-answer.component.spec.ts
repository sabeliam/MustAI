import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantAnswerComponent } from './assistant-answer.component';
import { TmdbClient } from '@core/description/tmdb/tmdb-client.service';
import { mock } from 'ts-mockito';
import { NgxsModule } from '@ngxs/store';
import { FilmsState } from '../../films/films.state';
import { DescriptionService } from '@core/description/description.service';

describe('AssistantAnswerComponent', () => {
    let component: AssistantAnswerComponent;
    let fixture: ComponentFixture<AssistantAnswerComponent>;
    let descriptionServiceMock: DescriptionService;

    beforeEach(async () => {
        descriptionServiceMock = mock(DescriptionService);

        await TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([FilmsState])],
            declarations: [AssistantAnswerComponent],
            providers: [
                {
                    provide: DescriptionService,
                    useValue: descriptionServiceMock,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AssistantAnswerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
