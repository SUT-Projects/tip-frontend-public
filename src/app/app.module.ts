import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { QuizComponent } from './quiz/quiz.component';

import { ResultComponent } from './tools/result/result.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';

import { AdminViewComponent } from './admin-view/admin-view.component';
import { TutorQuizComponent } from './tutor-quiz/tutor-quiz.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,

    ResultComponent,
    CreatePostComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
