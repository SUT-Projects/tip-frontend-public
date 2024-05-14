import { Component } from '@angular/core';
import questions_1 from "./questions_1.json";
import questions_2 from "./questions_2.json";
import all_quizzes from "./all_quizzes.json";
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss'
})
export class QuizComponent {
  started: boolean = false;
  startQuiz() {
    this.started = true;
  }

  quizId: string;

  constructor(private route: ActivatedRoute, private quizService: QuizService) {}

  
  //questions: any = questions_1; ///////
  //questions: any = questions_2;
  i: number = 0;
  questions: any;
  question: any;
  totalQuestions: any;
  allQuizzes: any;

  loadQuizData() {
    this.quizService.getQuizzes().subscribe(
      (response) => {
        this.allQuizzes = response;
        var i: number = 0;
        for(i = 0; i < this.allQuizzes.length; i++){
        if (this.quizId == this.allQuizzes[i]._id) { // quizId ---> _id
          this.questions = this.allQuizzes[i].questions_list;
        } 
        }
    console.log(this.questions);
    this.question = this.questions[this.i];
    this.totalQuestions = this.questions.length;
        console.log(this.allQuizzes);
        console.log(response);
      }
    );
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.quizId = params['quizId'];
      this.loadQuizData();
    })

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
    if (this.answer === this.question.options[this.question.correct_option]) {
    this.feedback = "That's correct!";
  } else {
    this.feedback = "Nice try! The correct answer is " + this.question.options[this.question.correct_option] + "."
  }
  this.answerGiven = true;
}


buttonName: string = "Next Question";
quizEnd: boolean = false;
  onNext() {
    if (this.answer === this.question.options[this.question.correct_option]) {
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
