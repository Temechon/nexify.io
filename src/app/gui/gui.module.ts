import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionButtonComponent } from './action-button/action-button.component';
import { SidebarCoursesComponent } from './sidebar/sidebar-courses.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserButtonComponent } from './user-button/user-button.component';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
    imports: [
        CommonModule,
        // FormsModule,
        // ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        ActionButtonComponent,
        UserButtonComponent,
        SidebarComponent,
        SidebarCoursesComponent,
        LoaderComponent
    ],
    exports: [
        ActionButtonComponent,
        UserButtonComponent,
        SidebarComponent,
        SidebarCoursesComponent,
        LoaderComponent
    ],
    entryComponents: [],
    providers: [],
})
export class GuiModule { }
