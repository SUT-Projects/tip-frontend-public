import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizService } from '../../quiz.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  questions: any;
  question: any;
  totalQuestions: any;
  allQuizzes: any;
  quizId: string;

  loadQuizData() {
    this.quizService.getQuizzes().subscribe(
      (response) => {
        this.allQuizzes = response;
        /*var i: number = 0;
        for(i = 0; i < this.allQuizzes.length; i++){
          this.quizId[i] = this.allQuizzes[i]._id;
        }*/
        this.allQuizzes = this.allQuizzes.filter(quiz => quiz.quiz_status === 1);
        console.log(this.allQuizzes);
        console.log(response);
      }
    );
  }

  constructor(private router: Router, private modalService: NgbModal, private quizService: QuizService) { }

  ngOnInit() {
    this.loadQuizData();
    }
  
  startQuiz(quizId: string) {
    this.router.navigate(['/tables', quizId]);
  }

  quizDashboard(quizDb: string) {
    this.router.navigate(['/tables/student-dashboard', quizDb]);
  }

}

