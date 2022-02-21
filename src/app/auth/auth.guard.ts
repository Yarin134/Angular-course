import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authService:AuthService , private router:Router) {}
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot)
                : boolean | Observable<boolean> | Promise<boolean> | UrlTree {

        return this.authService.user.pipe(take(1) , map(user => { // TAKES THE LATEST VALUE!!
            const value = !!user;
            if(value) {
                return true;
            } else {
                this.router.createUrlTree(['/Authenticate'])
                return false
            }
            // return !!user; // returns a true boolean if the user is not udefined and false boolean if user is not undefined

        }))
    }
}