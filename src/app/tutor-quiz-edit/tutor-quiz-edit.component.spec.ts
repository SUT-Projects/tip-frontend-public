import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorQuizEditComponent } from './tutor-quiz-edit.component';

describe('TutorQuizEditComponent', () => {
  let component: TutorQuizEditComponent;
  let fixture: ComponentFixture<TutorQuizEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorQuizEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TutorQuizEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
