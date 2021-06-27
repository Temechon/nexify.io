import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AutosizeModule } from "ngx-autosize";
import { GuiModule } from "../gui/gui.module";
import { RemoveRegexp } from "../helpers/Pipe";
import { CourseRoutingModule } from "./course-routing.module";
import { CourseComponent } from './course/course.component';
import { CodeEditComponent } from "./edit/blocks/code-edit/code-edit.component";
import { ImgEditComponent } from './edit/blocks/img-edit/img-edit.component';
import { LinkEditComponent } from "./edit/blocks/link-edit/link-edit.component";
import { ChapterEditComponent } from "./edit/chapter-edit/chapter-edit.component";
import { CourseHomeEditComponent } from './edit/course-home-edit/course-home-edit.component';
import { TaskEditComponent } from "./edit/task-edit/task-edit.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CodeViewComponent } from "./view/blocks/code-view/code-view.component";
import { ImgViewComponent } from './view/blocks/img-view/img-view.component';
import { LinkViewComponent } from "./view/blocks/link-view/link-view.component";
import { ChapterViewComponent } from "./view/chapter-view/chapter-view.component";
import { CourseHomeViewComponent } from "./view/course-home-view/course-home-view.component";
import { TaskViewComponent } from "./view/task-view/task-view.component";

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
        ImgViewComponent,
        ImgEditComponent
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
