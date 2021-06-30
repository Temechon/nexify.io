import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CanAccessGuard implements CanActivate {

    constructor(
        private userService: AuthService,
        private router: Router) {

    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.userService.isLoggedIn().pipe(
            take(1),
            map((canAccess: boolean) => {
                console.log("Can access ?", canAccess);
                if (canAccess) {
                    return true;
                } else {
                    this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url } })
                }
                return canAccess;
            })
        );
    }
}
