import { Component } from '@angular/core';
import questions_1 from "./questions_1.json";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  questions: any = questions_1;
  i: number = 0;
  question: any = this.questions[this.i];

  totalQuestions = this.questions.length;

  ngOnInit() {
    console.log(this.questions[0]);
    console.log(this.question);
  }
  answer: any;
  score: any = 0;
  feedback: any;

answerGiven: boolean = false;

  onSelecting(value) {
    console.log(value);
    this.answer = value;
    if (this.answer === this.question.correct_option) {
    this.feedback = "GREAT JOB";
  } else {
    this.feedback = "NOT GREAT"
  }
  this.answerGiven = true;
}

  onNext() {
    if (this.answer === this.question.correct_option) {
      ++this.score;
    }
    console.log("Score : ", this.score);
    // console.log(this.questions);
    console.log("Answer : ", this.answer);
    ++this.i;
    this.question = this.questions[this.i];
    console.log(this.i);
    console.log("Question : ", this.question);
    console.log("on click");
    this.feedback = "";
    this.answerGiven = false;
  }
  
}
