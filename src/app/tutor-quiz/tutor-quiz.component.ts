import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import all_quizzes from '../quiz/all_quizzes.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-tutor-quiz',
  templateUrl: './tutor-quiz.component.html',
  styleUrl: './tutor-quiz.component.scss'
})
export class TutorQuizComponent {
  dateNow: any = new Date();
  quizForm: FormGroup;
  all_quizzes: any = all_quizzes;
  constructor(private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder) { 
    this.quizForm = this.formBuilder.group({});
    this.all_quizzes.forEach(quiz => {
      this.quizForm.addControl("title", this.formBuilder.control("", Validators.required));
      this.quizForm.addControl("dueDate", this.formBuilder.control(this.formatDate(this.dateNow), Validators.required));
    })
  }

  ngOnInit() {
  }
  
  editQuiz(quizId: string) {
    this.router.navigate(['/tutor-quiz', quizId]);
  }

  quizDashboard(quizDb: string) {
    this.router.navigate(['/tutor-quiz/tutor-dashboard', quizDb]);
  }

  releaseQuiz(quiz) {
    quiz.release = true;
  }


  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  create_quiz (quizForm) {
    const dateNow: any = new Date();

    const title: any = quizForm.value.title;
    const dueDate: any = quizForm.value.dueDate;
    const created_at: any = this.formatDate(dateNow);
    const author_name: any = localStorage.getItem('userName');

    const newQuiz = {
      quizTitle: title,
      quizId: "quiz_" + (all_quizzes.length + 1),
      quizDue: dueDate,
      quizCreated: created_at,
      author: author_name,
      release: false,
      questions: [{
        _id: "q_1",
        question_text: "[question?]",
        options: 
          ["[opt1]","[opt2]","[opt3]","[opt4]"]
        ,
        correct_option: "[correct ans]",
        point:  1
      }]
    };

    this.all_quizzes.push(newQuiz);
    console.log(this.all_quizzes);

    
  }

  
  onSubmit() {

    
    if (this.quizForm.valid) {
      // Form is valid, handle submission logic here
      console.log(this.quizForm.value);
      console.log("FORM IS VALID.")
      this.create_quiz(this.quizForm);
      //this.open_create_post_interface = !this.open_create_post_interface;
    } else {
      alert("Form is invalid");
      console.log("FORM IS INVALID!!!")
    }
    
   
    


    
  }

  openCreate = false;
}
