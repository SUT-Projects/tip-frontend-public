import { Component } from '@angular/core';
import user_list from './sample_user_data.json'


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrl: './admin-view.component.scss'
})
export class AdminViewComponent {
  all_user: any = user_list;
  
  constructor() {
    this.all_user.forEach(user => {
      user.showPassword = false;
    });
  }


  toggle_pass (user) {
    user.showPassword = !user.showPassword;
  }

  create_user () {

  }

  delete_user () {
    
  }

  edit_user () {
    
  }
}
