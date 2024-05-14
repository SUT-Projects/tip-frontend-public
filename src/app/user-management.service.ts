import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class UserManagementService {

  private apiUrl = "http://127.0.0.1:5000";

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all-users`);
  }

  createUser(details: {userType, email, name, password}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-user`, details);
  }

  updateUser(details: {_id, userType, email, name, password, created_date}): Observable<any> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //const options = { headers: headers };
    return this.http.post<any>(`${this.apiUrl}/update-user`, details);
  }

  deleteUser(_id): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-user?user_id=${_id}`, _id);
  }

  constructor(private http: HttpClient) { }
}

