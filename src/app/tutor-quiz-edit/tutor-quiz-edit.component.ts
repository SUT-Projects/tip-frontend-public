import { Component } from '@angular/core';
import questions_1 from "../quiz/questions_1.json";
import questions_2 from "../quiz/questions_2.json";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutor-quiz-edit',
  templateUrl: './tutor-quiz-edit.component.html',
  styleUrl: './tutor-quiz-edit.component.scss'
})
export class TutorQuizEditComponent {
  quizId: string;

  constructor(private route: ActivatedRoute) {}

  
  //questions: any = questions_1; ///////
  //questions: any = questions_2;
  questions: any;
  totalQuestions: any;

  loadQuizData() {
    if (this.quizId == 'questions_1') {
      this.questions = questions_1;
    } 
    if (this.quizId == 'questions_2') {
      this.questions = questions_2;
    }
    this.totalQuestions = this.questions.length;
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.quizId = params['quizId'];
      this.loadQuizData();
    })

  
  }

  getOptionLetter(index: number): string {
    // Array of letters from 'a' to 'z'
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    // Return the letter corresponding to the index
    return letters[index];
  }

  readOnly: boolean = true;

  confirm_edit(quizForm) {
    console.log(quizForm.value.question_1);


    //for (var i=0; i < this.questions.length; i++) {
     // this.questions[i].question_text = quizForm.questions[i].value.question_text;
    //}
      
    

    this.readOnly = !this.readOnly;
  }

  confirmEdit(): void {
    // Save changes
  }

  create_question() {
    this.questions[this.questions.length - 1].last = false;
    const newQuestion = {
      _id: "q_" + this.questions.length,
      question_text: "",
      options: 
        ["", "", "", ""]
      ,
      correct_option: "",
      last: true
    };
    console.log(newQuestion);
    
    this.questions.push(newQuestion);
    

    console.log(this.questions);

  }
}
