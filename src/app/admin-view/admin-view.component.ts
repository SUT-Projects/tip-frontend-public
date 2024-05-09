import { Component } from '@angular/core';
import user_list from './sample_user_data.json';
import { isEmpty } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {

  userForm: FormGroup;

  all_user: any = user_list;
  selectedUser: any = {};

  constructor(private formBuilder: FormBuilder) {
    this.all_user.forEach(user => {
      user.showPassword = false;
    });

    this.userForm = this.formBuilder.group({
      //name: ['', Validators.required],
      //email: [''],
      //password: [''],
      //student_id: ['']
    });

    this.all_user.forEach(user => {
      this.userForm.addControl("role", this.formBuilder.control(user.user_type));
      this.userForm.addControl("_id", this.formBuilder.control(user._id));
      this.userForm.addControl("name", this.formBuilder.control(user.name, Validators.required));
      this.userForm.addControl("student_id", this.formBuilder.control(user.student_id));
      this.userForm.addControl("email", this.formBuilder.control(user.email, Validators.required));
      this.userForm.addControl("password", this.formBuilder.control(user.password, Validators.required));
    });
  }
  

  toggle_pass (user) {
    user.showPassword = !user.showPassword;
  }

  open_create_interface: boolean = false;
  create_button () {
    console.log(this.all_user[this.all_user.length-1])
    var new_id: any = "user" + (parseInt(this.all_user[this.all_user.length - 1]._id[4]) + 1);
    console.log(new_id);
    this.userForm.setValue({role: "", _id: new_id, name: "", student_id: "", email: "", password: ""});
    
    this.open_create_interface = !this.open_create_interface;
    this.selectedUser = null; 
  }


  create_user (userForm) {
    

    const _id = userForm.value._id; 
    const name = userForm.value.name;
    const email = userForm.value.email;
    const password = userForm.value.password;
    const student_id = userForm.value.student_id;
    const userType = userForm.value.role;

    const newUser = {
      _id: _id,
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

    //userForm.resetForm();
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
    this.userForm.setValue({role: user.user_type, _id: user._id, name: user.name, student_id: user.student_id, email: user.email, password: user.password});
    console.log(this.selectedUser);
    
  }

  cancel_change () {
  
    this.open_create_interface = !this.open_create_interface;
  }

  update_user(updatedUser) {
    const index = this.all_user.findIndex(user => user._id === updatedUser._id);
    console.log(index);
    if (index !== -1) {
      this.all_user[index]._id = updatedUser._id;
      this.all_user[index].name = updatedUser.name;
      this.all_user[index].email = updatedUser.email;
      this.all_user[index].password = updatedUser.password;
      this.all_user[index].student_id = updatedUser.student_id;
      this.all_user[index].user_type = updatedUser.role;
      console.log(this.all_user[index].name);
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

  onSubmit() {

    if (this.selectedUser != null) {
      console.log(this.userForm.value)
      this.update_user(this.userForm.value);
      this.open_create_interface = !this.open_create_interface;
    } else {
      if (this.userForm.valid) {
        // Form is valid, handle submission logic here
        console.log(this.userForm.value);
        console.log("FORM IS VALID.")
        this.create_user(this.userForm);
        this.open_create_interface = !this.open_create_interface;
      } else {
        alert("Form is invalid");
        console.log("FORM IS INVALID!!!")
      }
    }
    this.selectedUser = null;
    


    
  }
}


