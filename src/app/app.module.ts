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
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RemoveRegexp } from './helpers/Pipe';
import { LinkEditComponent } from './edit/link-edit/link-edit.component';
import { LinkViewComponent } from './view/link-view/link-view.component';


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
    CodeEditComponent,
    RemoveRegexp,
    LinkEditComponent,
    LinkViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AutosizeModule,
    DragDropModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
