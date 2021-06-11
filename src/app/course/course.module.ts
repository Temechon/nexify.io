import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutosizeModule } from "ngx-autosize";
import { RemoveRegexp } from "../helpers/Pipe";
import { CourseHomeComponent } from "./course-home/course-home.component";
import { CourseRoutingModule } from "./course-routing.module";
import { CourseComponent } from "./course.component";
import { CodeEditComponent } from "./edit/code-edit/code-edit.component";
import { StepEditComponent } from "./edit/course-edit/step-edit.component";
import { LinkEditComponent } from "./edit/link-edit/link-edit.component";
import { TaskEditComponent } from "./edit/task-edit/task-edit.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CodeViewComponent } from "./view/code-view/code-view.component";
import { StepViewComponent } from "./view/course-view/step-view.component";
import { LinkViewComponent } from "./view/link-view/link-view.component";
import { TaskViewComponent } from "./view/task-view/task-view.component";

@NgModule({
    declarations: [

        SidebarComponent,
        CourseHomeComponent,
        StepViewComponent,
        CodeViewComponent,
        TaskViewComponent,
        StepEditComponent,
        TaskEditComponent,
        CodeEditComponent,
        RemoveRegexp,
        LinkEditComponent,
        LinkViewComponent,
        CourseComponent
    ],
    imports: [
        FormsModule,
        AutosizeModule,
        DragDropModule,
        FormsModule,
        CourseRoutingModule,
        CommonModule,

    ],
    entryComponents: []

})
export class CourseModule { }
