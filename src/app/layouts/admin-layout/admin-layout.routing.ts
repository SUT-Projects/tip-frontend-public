import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { QuizComponent } from '../../quiz/quiz.component';
import { ForumComponent } from '../../pages/forum/forum.component';
import { AdminViewComponent } from '../../admin-view/admin-view.component';
import { TutorQuizComponent } from '../../tutor-quiz/tutor-quiz.component';
import { TutorQuizEditComponent } from '../../tutor-quiz-edit/tutor-quiz-edit.component';
import { StudentDashboardComponent } from '../../student-dashboard/student-dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'forum',         component: ForumComponent },
    { path: 'tables/:quizId',         component: QuizComponent },
    { path: 'admin-view',       component: AdminViewComponent},
    { path: 'tutor-quiz',       component: TutorQuizComponent},
    { path: 'tutor-quiz/:quizId',         component: TutorQuizEditComponent },
    { path: 'tutor-quiz/tutor-dashboard/:quizDb',         component: DashboardComponent },
    { path: 'tables/student-dashboard/:quizDb',         component: StudentDashboardComponent }
];
