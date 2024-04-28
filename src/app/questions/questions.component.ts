import { Component } from '@angular/core';
import questions_1 from "./questions_1.json";
import { Output, EventEmitter } from '@angular/core'

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

    // console.log("Seconds : ", this.seconds);
    this.minutes = "0" + this.minutes;
    this.seconds = "0" + this.seconds;
    setInterval(() => {
      if (this.seconds >= 59) {
        ++this.minutes;
        this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        this.seconds = 0;
      } else {
        ++this.seconds;
      }
      this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
    }, 1000);
  }
  answer: any;
  score: any = 0;
  feedback: any;

answerGiven: boolean = false;
  onSelecting(value) {
    console.log(value);
    this.answer = value;
    if (this.answer === this.question.correct_option) {
    this.feedback = "That's correct!";
  } else {
    this.feedback = "Nice try! The correct answer is " + this.question.correct_option + "."
  }
  this.answerGiven = true;
}


buttonName: string = "Next Question";
quizEnd: boolean = false;
  onNext() {
    if (this.answer === this.question.correct_option) {
      ++this.score;
    }
    console.log("Score : ", this.score);
    // console.log(this.questions);
    console.log("Answer : ", this.answer);
    if (this.answer != undefined) {
      ++this.i;
      this.question = this.questions[this.i];
      console.log(this.i);
      console.log("Question : ", this.question);
      console.log("on click");
      this.feedback = "";
      this.answerGiven = false;
      this.answer = undefined;
      } else {
        this.feedback = "Please select an answer."
      }
    
    if (this.i == this.questions.length - 1) {
      this.buttonName = "Submit";
    }
    this.endTime = this.minutes + " : " + this.seconds;
    
    if (this.i == this.questions.length) {
      this.quizEnd = true;
    }

    console.log(this.quizEnd);
  }

  
  

  date: any = new Date();
  minutes: any = 0;
  seconds: any = 0;
  
  endTime: any = 0;
  
}
