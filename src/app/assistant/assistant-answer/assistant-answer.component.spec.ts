import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantAnswerComponent } from './assistant-answer.component';

describe('AssistantAnswerComponent', () => {
  let component: AssistantAnswerComponent;
  let fixture: ComponentFixture<AssistantAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssistantAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
