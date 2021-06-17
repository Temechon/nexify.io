import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutosizeModule } from "ngx-autosize";
import { RemoveRegexp } from "../helpers/Pipe";
import { CourseHomeViewComponent } from "./view/course-home-view/course-home-view.component";
import { CourseRoutingModule } from "./course-routing.module";
import { CodeEditComponent } from "./edit/code-edit/code-edit.component";
import { ChapterEditComponent } from "./edit/chapter-edit/chapter-edit.component";
import { LinkEditComponent } from "./edit/link-edit/link-edit.component";
import { TaskEditComponent } from "./edit/task-edit/task-edit.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CodeViewComponent } from "./view/code-view/code-view.component";
import { ChapterViewComponent } from "./view/chapter-view/chapter-view.component";
import { LinkViewComponent } from "./view/link-view/link-view.component";
import { TaskViewComponent } from "./view/task-view/task-view.component";
import { CourseComponent } from './course/course.component';
import { CourseHomeEditComponent } from './edit/course-home-edit/course-home-edit.component';
import { GuiModule } from "../gui/gui.module";

@NgModule({
    declarations: [

        SidebarComponent,
        CourseHomeViewComponent,
        ChapterViewComponent,
        CodeViewComponent,
        TaskViewComponent,
        ChapterEditComponent,
        TaskEditComponent,
        CodeEditComponent,
        RemoveRegexp,
        LinkEditComponent,
        LinkViewComponent,
        CourseComponent,
        CourseHomeEditComponent,
    ],
    imports: [
        FormsModule,
        AutosizeModule,
        DragDropModule,
        FormsModule,
        CourseRoutingModule,
        CommonModule,
        GuiModule

    ],
    entryComponents: []

})
export class CourseModule { }
