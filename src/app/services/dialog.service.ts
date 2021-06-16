import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogRef } from '../model/DialogRef';

@Injectable({
    providedIn: 'root'
})
export class DialogService {


    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
    }

    openDialog<T extends DialogComponent>(classname: Type<T>, data: {
        title: string,
        content: string,
        button1: {
            text: string,
            param: string,
            type?: string
        },
        button2: {
            text: string,
            param: string,
            type?: string
        }

    }): DialogRef<T> {

        const componentRef = this.componentFactoryResolver.resolveComponentFactory(classname).create(this.injector);
        this.appRef.attachView(componentRef.hostView);

        // Get DOM element from component
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // Append DOM element to the body
        document.body.appendChild(domElem);
        componentRef.instance.data = data;

        const dialogref = new DialogRef<T>(this.appRef);
        dialogref.componentRef = componentRef;
        componentRef.instance.dialogRef = dialogref;

        return dialogref;
    }


}
