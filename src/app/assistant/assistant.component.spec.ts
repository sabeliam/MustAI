import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponent } from './assistant.component';
import { CompletionService } from '@core/services/completion/completion.service';
import { MockCompletionService } from '@core/services/completion/completion.mock.service';

describe('AssistantComponent', () => {
    let component: AssistantComponent;
    let fixture: ComponentFixture<AssistantComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AssistantComponent],
            providers: [
                {
                    provide: CompletionService,
                    useValue: MockCompletionService,
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
