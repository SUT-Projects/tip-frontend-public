import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  startQuiz(quizId: string) {
    this.router.navigate(['/tables', quizId]);
  }
  
}

