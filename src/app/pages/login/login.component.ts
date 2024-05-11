import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import user_list from '../../admin-view/sample_user_data.json';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user_list = user_list;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {

    this.loginForm = this.formBuilder.group({});
    this.loginForm.addControl("email", this.formBuilder.control("", Validators.required));
    this.loginForm.addControl("password", this.formBuilder.control("", Validators.required));
   
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit() {
    if (this.loginForm.valid && this.matchRecord()) {
      // Form is valid, handle submission logic here
      
      const userType: any = localStorage.getItem('userType');
      
      this.navigateToPage(userType);
      
      console.log(this.loginForm.value);
      console.log("FORM IS VALID.")
      //this.create_user(this.userForm); // go next page
    } else {
      alert("Wrong login credentials!");
      console.log("FORM IS INVALID!!!")
    }
  }

  matchRecord() {
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    var i: number = 0;
    for(i; i < user_list.length; i++){
      if (enteredEmail == user_list[i].email) {
        if (enteredPassword == user_list[i].password) {
          localStorage.setItem('userType', user_list[i].user_type);
          localStorage.setItem('userName', user_list[i].name)
          return true;
        }
      } 
    }
    return false;
  }

  navigateToPage(userType: string) {
    let route: string;

  switch (userType) {
    case 'admin':
      route = '/admin-view';
      break;
    case 'tutor':
      route = '/tutor-quiz';
      break;
    case 'student':
      route = '/tables';
      break;
    default:
      route = '/login';
  }

  this.router.navigate([route]);
  }
}
