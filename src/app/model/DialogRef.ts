import { ApplicationRef, ComponentRef } from "@angular/core";
import { Observable, Subject } from "rxjs";

export class DialogRef<T> {

    public componentRef: ComponentRef<T>

    protected onClose$: Subject<any> = new Subject();
    readonly onClose: Observable<any> = this.onClose$.asObservable();

    constructor(private appRef: ApplicationRef) {
    }


    close(res?: any) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.onClose$.next(res);
        this.onClose$.complete();
    }
}