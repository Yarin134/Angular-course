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
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(take(1) , map(user => { // TAKES THE LATEST VALUE!!
            const value = !!user;
            if(value) {
                return true; // instead of returning an observable with the user , returns an observable that wrappes the boolean , true
            } else {
                return this.router.createUrlTree(['/Authentication'])
                
            }
            // return !!user; // returns a true boolean if the user is not udefined and false boolean if user is not undefined

        }))
    }
}