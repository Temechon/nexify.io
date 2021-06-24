import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionButtonComponent } from './action-button/action-button.component';
import { UserButtonComponent } from './user-button/user-button.component';



@NgModule({
    imports: [
        CommonModule,
        // FormsModule,
        // ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        ActionButtonComponent,
        UserButtonComponent
    ],
    exports: [
        ActionButtonComponent,
        UserButtonComponent
    ],
    entryComponents: [],
    providers: [],
})
export class GuiModule { }
