import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tutor-quiz-edit',
  templateUrl: './tutor-quiz-edit.component.html',
  styleUrl: './tutor-quiz-edit.component.scss'
})
export class TutorQuizEditComponent {
  quizId: string;
  editForm: FormGroup;
  editsForm: FormGroup;
  questions_array: FormArray;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private quizService:QuizService, private router: Router) {
    this.editForm = this.formBuilder.group({
      question_text: ['', Validators.required],
      option_0: ['', Validators.required],
      option_1: ['', Validators.required],
      option_2: ['', Validators.required],
      option_3: ['', Validators.required],
      correct_option: ['', Validators.required],
      points: [0],
      question_id: ''
    });

    this.editsForm = this.formBuilder.group({
      questions_array: this.formBuilder.array([
      ])
    });

    /**this.editsForm = this.formBuilder.group({
      questions_array: this.formBuilder.array([
        this.formBuilder.group({
          question: '',
          options:
            this.formBuilder.array([
              this.formBuilder.control(''),
              this.formBuilder.control(''),
              this.formBuilder.control(''),
              this.formBuilder.control('')
            ]),
            correct_option:''
          })
          ])
        }) */

    this.questions_array = this.editsForm.get('questions_array') as FormArray;
  }
  
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
        /*this.questions.forEach(question => {
          this.editForm.addControl("question_text", this.formBuilder.control("", Validators.required));
          this.editForm.addControl("option_0", this.formBuilder.control("", Validators.required));
          this.editForm.addControl("option_1", this.formBuilder.control("", Validators.required));
          this.editForm.addControl("option_2", this.formBuilder.control("", Validators.required));
          this.editForm.addControl("option_3", this.formBuilder.control("", Validators.required));
          this.editForm.addControl("correct_option", this.formBuilder.control("", Validators.required));
        });*/
        console.log("TEST");

        while (this.questions_array.length) {
          this.questions_array.removeAt(0);}

        const quiz = this.allQuizzes.find(q => q._id === this.quizId);
        if (quiz) {
          quiz.questions_list.forEach(question => {
          this.addQuestion(question);
        });
      }
      }
    )
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

  createQuestionGroup(question): FormGroup {
    return this.formBuilder.group({
      question: [question.question, Validators.required],
      options: this.formBuilder.array(
        question.options.map(option => this.formBuilder.control(option, Validators.required))
      ),
      correct_option: [question.options[question.correct_option], Validators.required],
      points: 1,
      question_id: ''
    });
  }

  addQuestion(question = { question: '', options: ['', '', '', ''], correct_option: '', points: 0, question_id: ''}) {
    this.questions_array.push(this.createQuestionGroup(question));
  }

  updateCorrectOptionsIndex() {
    for (let i = 0; i < this.questions_array.length; i++) {
      const questionGroup = this.questions_array.at(i) as FormGroup;
      const optionsArray = questionGroup.get('options') as FormArray;
      const correctOptionValue = questionGroup.get('correct_option')?.value;

      const correctOptionIndex = optionsArray.controls.findIndex(option => option.value === correctOptionValue);

      if (correctOptionIndex !== -1) {
        questionGroup.get('correct_option')?.setValue(correctOptionIndex);
      } else {
        console.error(`Correct option value '${correctOptionValue}' not found in options array for question ${i + 1}`);
      }
      console.log(this.questions_array);
    }
  }

  confirmEdit() {
    console.log("I was here");
    console.log(this.editsForm);
    
    /*
    var i;
    for(i=0;i < this.questions_array.length - 1; i++) {
      var correct_index;
      if (this.editsForm.value.questions_array[i].correct_option == this.editsForm.value.questions_array[i].option_0) {
        this.editsForm.value.questions_array[i].correct_option = 0;
        this.questions_array.at(i).get('correct_option')?.setValue(0);
        correct_index = 0;
      }
      if (this.editsForm.value.questions_array[i].correct_option == this.editsForm.value.questions_array[i].option_1) {
        this.editsForm.value.questions_array[i].correct_option = 1;
        correct_index = 1;
      }
      if (this.editsForm.value.questions_array[i].correct_option == this.editsForm.value.questions_array[i].option_2) {
        this.editsForm.value.questions_array[i].correct_option = 2;
        correct_index = 2;
      }
      if (this.editsForm.value.questions_array[i].correct_option == this.editsForm.value.questions_array[i].option_3) {
        this.editsForm.value.questions_array[i].correct_option = 3;
        correct_index = 2;
     }
    }*/

    this.updateCorrectOptionsIndex();

    if (this.editsForm.valid) {
      const updatedQuiz = {
        ...this.allQuizzes.find(q => q._id === this.quizId),
        questions_list: this.editsForm.value.questions_array,
        updated_date: new Date().toISOString(),
        total_questions: this.editsForm.value.questions_array.length
      };
      console.log(updatedQuiz);
      // Call your service method to update the quiz here
      this.quizService.updateQuiz(updatedQuiz).subscribe((response) => {
        console.log("Is there response?", response);
        this.loadQuizData();
      });
    }
    console.log("I was here2");
    this.toggleReadOnly();
  }

  removeQuestion(questionIndex) {
    if(confirm("Are you sure to remove this question?")) {
      const quizToUpdate = this.allQuizzes.find(q => q._id === this.quizId);  
      const updatedQuestionsArray = [...quizToUpdate.questions_list];
        updatedQuestionsArray.splice(questionIndex, 1);
        const updatedQuiz = {
        ...this.allQuizzes.find(q => q._id === this.quizId),
        questions_list: updatedQuestionsArray,
        updated_date: new Date().toISOString(),
        total_questions: this.editsForm.value.questions_array.length - 1
      };
      console.log(updatedQuiz);
      // Call your service method to update the quiz here
      this.quizService.updateQuiz(updatedQuiz).subscribe((response) => {
        console.log("Is there response?", response);
        this.loadQuizData();
      });
    }
  }

  toggleReadOnly() {
    this.readOnly = !this.readOnly;
    //console.log((this.questions_array.controls[0]));
  }

  create_question(editForm) {
    const currentQuiz = this.allQuizzes.find(q => q._id === this.quizId);
    var correct_index;
    if (this.editForm.value.correct_option == this.editForm.value.option_0) {
      correct_index = 0;
    }
    if (this.editForm.value.correct_option == this.editForm.value.option_1) {
      correct_index = 1;
    }
    if (this.editForm.value.correct_option == this.editForm.value.option_2) {
      correct_index = 2;
    }
    if (this.editForm.value.correct_option == this.editForm.value.option_3) {
      correct_index = 3;
    }
    const newQuestion = {
      question: this.editForm.value.question_text,
      options: 
        [this.editForm.value.option_0,
          this.editForm.value.option_1,
          this.editForm.value.option_2,
          this.editForm.value.option_3]
      ,
      correct_option: correct_index,
      points: 5,
      question_id: "no idea" 
    };
    const updatedQuiz = {
      ...currentQuiz,
      total_questions: currentQuiz.questions_list.length + 1,
      questions_list: [...currentQuiz.questions_list, newQuestion],
      updated_date: new Date().toISOString()
    }

    this.quizService.updateQuiz(updatedQuiz).subscribe(
      (response) => {
        console.log(updatedQuiz);
        console.log(response);
        this.loadQuizData();
        //this.router.navigate([this.router.url]);
      });
    
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
