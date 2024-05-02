import { Component } from '@angular/core';
import user_list from './sample_user_data.json'
import { isEmpty } from 'rxjs';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {
  all_user: any = user_list;
  selectedUser: any = {};

  constructor() {
    this.all_user.forEach(user => {
      user.showPassword = false;
    });
  }
  

  toggle_pass (user) {
    user.showPassword = !user.showPassword;
  }

  open_create_interface: boolean = false;
  create_button () {
    this.open_create_interface = !this.open_create_interface;
    this.selectedUser = null; 
  }


  create_user (userForm) {
    
    const name = userForm.value.name;
    const email = userForm.value.email;
    const password = userForm.value.password;
    const student_id = userForm.value.student_id;
    const userType = userForm.value.role;

    const newUser = {
      _id: 'user' + (this.all_user.length + 1),
      user_type: userType,
      name: name,
      email: email,
      password: password,
      student_id: student_id
    };

    this.all_user.push(newUser);
    this.all_user.forEach(user => {
      user.showPassword = false;
    });

    console.log(this.all_user);

    userForm.resetForm();
  }


  
  delete_user (user) {
    const index = this.all_user.indexOf(user);

    if(index !== -1) {
      this.all_user.splice(index,1);
    }
  }

  edit_user (user) {
    this.open_create_interface = !this.open_create_interface
    this.selectedUser = user;

  }

  submitForm (userForm) {
    if (this.selectedUser != null) {
      this.update_user(userForm.value);
      
    } else {
      this.create_user(userForm);
    }
    this.selectedUser = null;
    this.open_create_interface = !this.open_create_interface;
  }

  update_user(updatedUser) {
    const index = this.all_user.findIndex(user => user._id === updatedUser._id);
    if (index !== -1) {
      this.all_user[index].name = updatedUser.name;
      this.all_user[index].email = updatedUser.email;
      this.all_user[index].password = updatedUser.password;
      this.all_user[index].student_id = updatedUser.student_id;
      this.all_user[index].userType = updatedUser.role;
    }
  }

  sortBy(prop: string) {
    if (prop != 'user_type') {
      this.all_user.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    } else {
      this.all_user.sort((a, b) => {
        const roleOrder = { 'admin': 0, 'tutor': 1, 'student': 2};
        return roleOrder[a[prop]] - roleOrder[b[prop]];
      });
    }
  }
}


