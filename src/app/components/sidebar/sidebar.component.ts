import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    roles: string[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-chart-pie-35 text-primary', class: '', roles: [] },
    //{ path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Quizzes',  icon:'ni-bullet-list-67 text-red', class: '', roles: ['student']},
    { path: '/forum', title: 'Forum',  icon:'ni-satisfied text-yellow', class: '', roles: ['student', 'tutor']},
    { path: '/admin-view', title: 'Admin View',  icon:'ni-badge text-grey', class: '', roles: ['admin']},
    { path: '/tutor-quiz', title: 'Show Quizzes',  icon:'ni-folder-17 text-purple', class: '', roles: ['tutor']},
    { path: '/login', title: 'Logout',  icon:'ni-key-25 text-info', class: '', roles: ['admin', 'student', 'tutor'] }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {

    const userRoles = [localStorage.getItem('userType')];
    
    this.menuItems = ROUTES.filter(menuItem => menuItem.roles.some(role => userRoles.includes(role)));
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  userRoles: any = [localStorage.getItem('userType')];
  userName: any = [localStorage.getItem('userName')];
  
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
