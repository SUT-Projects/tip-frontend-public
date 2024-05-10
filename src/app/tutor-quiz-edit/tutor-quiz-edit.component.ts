import { Component } from '@angular/core';
import questions_1 from "../quiz/questions_1.json";
import questions_2 from "../quiz/questions_2.json";
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-tutor-quiz-edit',
  templateUrl: './tutor-quiz-edit.component.html',
  styleUrl: './tutor-quiz-edit.component.scss'
})
export class TutorQuizEditComponent {
  quizId: string;
  editForm: FormGroup;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.editForm = this.formBuilder.group({});
  }

  /*oneCorrectOptionValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const options = ['option_0', 'option_1', 'option_2', 'option_3'];
      const correctOption = control.get('correct_option')?.value;
      let correctCount = 0;
  
      // Count the number of correct options
      options.forEach(option => {
        if (control.get(option)?.value === correctOption) {
          correctCount++;
        }
      });
  
      // If exactly one option is marked as correct, return null (valid)
      // Otherwise, return an error indicating validation failure
      return correctCount === 1 ? null : { invalidCorrectOption: true };
    };
  }*/
  
  
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

    this.questions.forEach(question => {
      this.editForm.addControl("question_text", this.formBuilder.control("", Validators.required));
      this.editForm.addControl("option_0", this.formBuilder.control("", Validators.required));
      this.editForm.addControl("option_1", this.formBuilder.control("", Validators.required));
      this.editForm.addControl("option_2", this.formBuilder.control("", Validators.required));
      this.editForm.addControl("option_3", this.formBuilder.control("", Validators.required));
      this.editForm.addControl("correct_option", this.formBuilder.control("", Validators.required));

});
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

  create_question(editForm) {
    this.questions[this.questions.length - 1].last = false;
    const newQuestion = {
      _id: "q_" + this.questions.length,
      question_text: this.editForm.value.question_text,
      options: 
        [this.editForm.value.option_0,
          this.editForm.value.option_1,
          this.editForm.value.option_2,
          this.editForm.value.option_3]
      ,
      correct_option: this.editForm.value.correct_option,
      last: true
    };
    console.log(newQuestion);
    
    this.questions.push(newQuestion);
    

    console.log(this.questions);

    editForm.reset();

  }

  onSubmit() {

    
    if (this.editForm.valid && !this.noCorrectMatch()) {
      // Form is valid, handle submission logic here
      console.log(this.editForm.value);
      console.log("FORM IS VALID.")
      this.create_question(this.editForm);
    } else {
      console.log (this.noCorrectMatch());
      alert("Form is invalid");
      console.log("FORM IS INVALID!!!");
    }
  }

  noCorrectMatch () {
    const correct_ans = this.editForm.value.correct_option;
    const opt1 = this.editForm.value.option_0;
    const opt2 = this.editForm.value.option_1;
    const opt3 = this.editForm.value.option_2;
    const opt4 = this.editForm.value.option_3;

    if (correct_ans != opt1 && 
      correct_ans != opt2 && 
      correct_ans != opt3 && 
      correct_ans != opt4 ) {
        return true;
      }
  }

}
