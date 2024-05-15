import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = "http://127.0.0.1:5000";

  getQuizzes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all-quizzes`);
  }

  createQuiz(details: {title, description, total_questions, passing_marks,
                        total_marks, questions_list, created_by_user_id, created_by_user_name, last_attempt_date, created_date}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-quiz`, details);
  }

  updateQuiz(details: {_id, total_questions, passing_mark, total_mark, questions_list, updated_date}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/update-quiz`, details);
  }

  deleteQuiz(_id): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-quiz?quiz_id=${_id}`, _id);
  }

  constructor(private http: HttpClient) { }
}

