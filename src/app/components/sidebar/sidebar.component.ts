import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-chart-pie-35 text-primary', class: '' },
    //{ path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/tables', title: 'Quizzes',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/forum', title: 'Forum',  icon:'ni-satisfied text-yellow', class: '' },
    { path: '/admin-view', title: 'Admin View',  icon:'ni-badge text-grey', class: '' },
    { path: '/tutor-quiz', title: 'Show Quizzes',  icon:'ni-folder-17 text-purple', class: '' },
    { path: '/login', title: 'Logout',  icon:'ni-key-25 text-info', class: '' }
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
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
