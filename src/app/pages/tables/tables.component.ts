import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import all_quizzes from '../../quiz/all_quizzes.json';
//import { ResultComponent } from 'src/app/tools/result/result.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  all_quizzes = all_quizzes.filter(quiz => quiz.release === true);
  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  startQuiz(quizId: string) {
    this.router.navigate(['/tables', quizId]);
  }

  quizDashboard(quizDb: string) {
    this.router.navigate(['/tables/student-dashboard', quizDb]);
  }

}

