import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { CourseViewComponent } from './view/course-view/course-view.component';
import { CodeViewComponent } from './view/code-view/code-view.component';
import { TaskViewComponent } from './view/task-view/task-view.component';
import { CourseEditComponent } from './edit/course-edit/course-edit.component';
import { TaskEditComponent } from './edit/task-edit/task-edit.component';
import { FormsModule } from '@angular/forms';
import { CodeEditComponent } from './edit/code-edit/code-edit.component';
import { AutosizeModule } from 'ngx-autosize';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    CourseViewComponent,
    CodeViewComponent,
    TaskViewComponent,
    CourseEditComponent,
    TaskEditComponent,
    CodeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutosizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
