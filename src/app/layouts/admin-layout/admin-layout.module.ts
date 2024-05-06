import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { ForumComponent } from '../../pages/forum/forum.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminViewComponent } from '../../admin-view/admin-view.component';
import { QuizComponent } from '../../quiz/quiz.component';
import { TutorQuizComponent } from '../../tutor-quiz/tutor-quiz.component';
import { TutorQuizEditComponent } from '../../tutor-quiz-edit/tutor-quiz-edit.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent, 
    ForumComponent,
    AdminViewComponent,
    QuizComponent,
    TutorQuizComponent,
    TutorQuizEditComponent
  ]
})

export class AdminLayoutModule {}
