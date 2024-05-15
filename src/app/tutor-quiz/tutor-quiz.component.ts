import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-tutor-quiz',
  templateUrl: './tutor-quiz.component.html',
  styleUrl: './tutor-quiz.component.scss'
})
export class TutorQuizComponent {
  dateNow: any = new Date();
  quizForm: FormGroup;
  constructor(private router: Router, private modalService: NgbModal, private formBuilder: FormBuilder, private quizService: QuizService) { 
    this.quizForm = this.formBuilder.group({});
    this.quizForm.addControl("title", this.formBuilder.control("", Validators.required));
    this.quizForm.addControl("dueDate", this.formBuilder.control(this.formatDate(this.dateNow), Validators.required));
    
  }

  questions: any;
  question: any;
  totalQuestions: any;
  allQuizzes: any;
  quizId: string;

  loadQuizData() {
    this.quizService.getQuizzes().subscribe(
      (response) => {
        this.allQuizzes = response;
        console.log(this.allQuizzes);
        console.log(response);
      }
    );
  }



  ngOnInit() {
    this.loadQuizData();
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
    const title: any = quizForm.value.title;
    const dueDate: any = quizForm.value.dueDate;
    
    const newQuiz = {
      title: title,
      description: "",
      total_questions: 0,
      passing_marks: 0,
      total_marks: 0,
      created_by_user_id: localStorage.getItem("userId"),
      created_by_user_name: localStorage.getItem("userName"),
      quiz_status: 0,
      questions_list: [],
      last_attempt_date: dueDate
    };

    this.quizService.createQuiz(newQuiz).subscribe(
      (response) => {
        console.log(response);
        this.loadQuizData();
      }
    )

    
  }

  openCreate = false;
  
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
    this.openCreate = !this.openCreate;
  }

  
}
