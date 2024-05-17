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
  progress: { [quizId: string]: string } = {};
  perc_score: { [quizId: string]: string } = {};
  attempts: { [quizId: string]: number } = {};

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
        if (this.allQuizzes) {
          this.allQuizzes.forEach((quiz: any) => {
            this.updateQuizData(quiz._id);
          });
        }
      }
    );
  }

  constructor(private router: Router, private modalService: NgbModal, private quizService: QuizService) { }

  ngOnInit() {
    this.loadQuizData();
    
  }
  
  startQuiz(quizId: string) {
    if (this.attempts[quizId] < 3) { 
    this.router.navigate(['/tables', quizId]);
    } else {
      alert("You exceeded 3 tries!");
    }
  }

  quizDashboard(quizDb: string) {
    this.router.navigate(['/tables/student-dashboard', quizDb]);
  }
 
  updateQuizData(quizId: string) {
    this.progress[quizId] = sessionStorage.getItem("progress" + quizId) == null ? "0%" : sessionStorage.getItem("progress" + quizId);
    this.perc_score[quizId] = sessionStorage.getItem("perc_score" + quizId) == null ? "NA" : sessionStorage.getItem("perc_score" + quizId);
    this.attempts[quizId] = parseInt(sessionStorage.getItem("attempts" + quizId) || '0');
    
  }

}

