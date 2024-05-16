import { Component, OnInit } from '@angular/core';
import user_list from './sample_user_data.json';
import { isEmpty } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent implements OnInit {

  userForm: FormGroup;
  all_user: any = [];
  selectedUser: any = {};
  open_create_interface: boolean = false;

  getUsers () {
    this.userManagementService.getUsers().subscribe(
      (response) => {
        this.all_user = response;
        console.log(this.all_user);
        console.log(response);
      
        this.all_user.forEach(user => {
          if (user.user_type == 0) {
            user.user_type = "admin";
          }
          if (user.user_type == 1) {
            user.user_type = "tutor";
          }
          if (user.user_type == 2) {
            user.user_type = "student";
          }
         })
  
        console.log(this.all_user);
        this.router.navigate([this.router.url]);
      }
    );

    
  }

  ngOnInit(): void {
    
  }

  constructor(private formBuilder: FormBuilder, private router:Router, private userManagementService: UserManagementService) {
    this.all_user.forEach(user => {
      user.showPassword = false;
    });
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.getUsers();
    
      
    
   }
  

  toggle_pass (user) {
    user.showPassword = !user.showPassword;
  }

  
  create_button () {
    this.selectedUser = null;
    this.userForm.reset();
    console.log(this.all_user[this.all_user.length-1])
    //var new_id: any = "user" + (parseInt(this.all_user[this.all_user.length - 1]._id[4]) + 1);
    //console.log(new_id);
    console.log(this.userForm.controls);
    
    //this.userForm.setValue({role: "", name: "", email: "", password: ""});
    
    this.open_create_interface = !this.open_create_interface;
    
    console.log("AAA");
    this.selectedUser = null; 
    console.log("BBB");
  }


  create_user (userForm) {
    

    const _id = userForm.value._id; 
    const name = userForm.value.name;
    const email = userForm.value.email;
    const password = userForm.value.password;
    const student_id = userForm.value.student_id;
    const userType = userForm.value.role;
    const created_date = userForm.value.created_date;
    var userTypeInt = 100;
    if (userType == 'admin') {
      var userTypeInt = 2;
    }
    if (userType == 'tutor') {
      var userTypeInt = 1;
    }
    if (userType == 'student') {
      var userTypeInt = 0;
    }

    const newUser = {
      //_id: _id,
      userType: userTypeInt,
      name: name,
      email: email,
      password: password,
      department: "not_assigned"
      //student_id: student_id
    };

    //this.all_user.push(newUser);

    this.userManagementService.createUser(newUser).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
      }
    )

    

    this.all_user.forEach(user => {
      user.showPassword = false;
    });

    console.log(this.all_user);

    //userForm.resetForm();
  }

  delete_prompt(user) {
    if(confirm("Are you sure to delete " + user.name + "?")){
      this.delete_user(user);
    };
  }
  
  delete_user (user) {
    /*const index = this.all_user.indexOf(user);

    if(index !== -1) {
      this.all_user.splice(index,1);
    }*/

    this.userManagementService.deleteUser(user._id).subscribe(
      (response) => {
        this.getUsers();
      }
    )
  }


  edit_user (user) {
    this.open_create_interface = !this.open_create_interface
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.userForm.setValue({role: user.user_type, name: user.name, email: user.email, password: user.password});
    console.log(this.selectedUser);
  }

  cancel_change () {
  
    this.open_create_interface = !this.open_create_interface;
  }

  update_user(User) {
    console.log();
    /*const index = this.all_user.findIndex(user => user._id === updatedUser._id);
    console.log(index);
    if (index !== -1) {
      this.all_user[index]._id = updatedUser._id;
      this.all_user[index].name = updatedUser.name;
      this.all_user[index].email = updatedUser.email;
      this.all_user[index].password = updatedUser.password;
      this.all_user[index].student_id = updatedUser.student_id;
      this.all_user[index].user_type = updatedUser.role;
      console.log(this.all_user[index].name);
    }*/
    const userType = this.userForm.value.role;
    var userTypeInt = 100;
    if (userType == 'admin') {
      var userTypeInt = 2;
    }
    if (userType == 'tutor') {
      var userTypeInt = 1;
    }
    if (userType == 'student') {
      var userTypeInt = 0;
    }
    const thisUser = {
      _id: User._id,
      created_date: User.created_date,
      userType: userTypeInt,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      //department: "not_assigned"
      //student_id: student_id
    };
    this.userManagementService.updateUser(thisUser).subscribe(
      (response) => {
        console.log(thisUser);
        console.log(response);
        this.getUsers();
      }
    )
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
      this.update_user(this.selectedUser);
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


