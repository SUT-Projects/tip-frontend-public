import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { QuizComponent } from 'src/app/quiz/quiz.component';
import { ForumComponent } from 'src/app/pages/forum/forum.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'forum',         component: ForumComponent },
    { path: 'tables/:quizId',         component: QuizComponent }
];
