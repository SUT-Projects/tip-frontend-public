import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorQuizComponent } from './tutor-quiz.component';

describe('TutorQuizComponent', () => {
  let component: TutorQuizComponent;
  let fixture: ComponentFixture<TutorQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorQuizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
