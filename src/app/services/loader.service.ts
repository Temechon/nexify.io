import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Loader {
  id: string;
  hide: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loader = new BehaviorSubject<Loader>({ id: 'global', hide: false });

  loaderStatus$ = this.loader.asObservable();

  constructor() {

  }

  /**
   * Show loader
   * @param {string} id
   */
  public show(id: string = 'global'): void {
    this.loader.next({ id, hide: false });
  }

  /**
   * Hide loader
   * @param {string} id
   */
  public hide(id: string = 'global'): void {
    this.loader.next({ id, hide: true });
  }
}
