import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tutor-quiz',
  templateUrl: './tutor-quiz.component.html',
  styleUrl: './tutor-quiz.component.scss'
})
export class TutorQuizComponent {

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  editQuiz(quizId: string) {
    this.router.navigate(['/tutor-quiz', quizId]);
  }

  quizDashboard(quizDb: string) {
    this.router.navigate(['/tutor-quiz/tutor-dashboard', quizDb]);
  }
}
