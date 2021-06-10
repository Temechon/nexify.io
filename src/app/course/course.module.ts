import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutosizeModule } from "ngx-autosize";
import { RemoveRegexp } from "../helpers/Pipe";
import { CourseHomeComponent } from "./course-home/course-home.component";
import { CourseRoutingModule } from "./course-routing.module";
import { CodeEditComponent } from "./edit/code-edit/code-edit.component";
import { CourseEditComponent } from "./edit/course-edit/course-edit.component";
import { LinkEditComponent } from "./edit/link-edit/link-edit.component";
import { TaskEditComponent } from "./edit/task-edit/task-edit.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CodeViewComponent } from "./view/code-view/code-view.component";
import { CourseViewComponent } from "./view/course-view/course-view.component";
import { LinkViewComponent } from "./view/link-view/link-view.component";
import { TaskViewComponent } from "./view/task-view/task-view.component";

@NgModule({
    declarations: [

        SidebarComponent,
        CourseHomeComponent,
        CourseViewComponent,
        CodeViewComponent,
        TaskViewComponent,
        CourseEditComponent,
        TaskEditComponent,
        CodeEditComponent,
        RemoveRegexp,
        LinkEditComponent,
        LinkViewComponent,
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
