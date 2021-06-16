import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActionButtonComponent } from './action-button/action-button.component';



@NgModule({
    imports: [
        CommonModule,
        // FormsModule,
        // ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        ActionButtonComponent
    ],
    exports: [
        ActionButtonComponent

    ],
    entryComponents: [],
    providers: [],
})
export class GuiModule { }
