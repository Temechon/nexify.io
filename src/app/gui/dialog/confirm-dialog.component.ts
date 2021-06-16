import { Component, Input } from '@angular/core';
import { DialogComponent } from './dialog.component';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})

export class ConfirmDialogComponent extends DialogComponent {

    @Input() data: any;

    constructor() {
        super();
    }

    close(param?: any) {
        super.close(param);
    }
}