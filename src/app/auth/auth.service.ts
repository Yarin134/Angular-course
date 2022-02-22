import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject,  throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
    kind:string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?: boolean  // ? => optional
}

@Injectable({
    providedIn:'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer:any;

    constructor(private http:HttpClient , private router:Router) {}
    signUp(email :string , password: string) {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjTKZ7OZsLK8d_t_b0m3FRhSaLhbVnICY' , 
        {email:email , 
        password:password ,
        returnSecureToken: true
        } // the data object will be send with the post request

        ).pipe(catchError(this.errorHandling) ,tap(resData => { // the response from the server
            this.handleAuthentication(
            resData.email ,
            resData.localId , 
            resData.idToken ,
            +resData.expiresIn)
         })) // pass the error argument automatically to the function
    }

    login(email :string , password :string) {
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjTKZ7OZsLK8d_t_b0m3FRhSaLhbVnICY' , 
        {   email:email , 
            password:password ,
            returnSecureToken: true
        }
        ).pipe(catchError(this.errorHandling) , tap(resData => { // the response from the server
           this.handleAuthentication(resData.email ,
             resData.localId , 
             resData.idToken ,
              +resData.expiresIn)
        })) // pass the error argument automatically to the function
    }

    private handleAuthentication (email : string ,userId:string ,  token:string , expiresIn:number) {
        // console.log(resData);
        const expiraionDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(
           email ,
            userId ,
              token , 
              expiraionDate)
              this.user.next(user);
              this.autoLogout(expiresIn * 1000)
              console.log(user);
              localStorage.setItem('userData' , JSON.stringify(user)) // set in localstorage the user data
    }

    private errorHandling(errorRes: HttpErrorResponse) {
        let error = 'unknown error '
        if(!errorRes.error || !errorRes.error.error) {  // if we have network error , or another format of unkown error
            return throwError(error);// returns observabe
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
            error = 'an email is already exists'
            break;
             
            case 'EMAIL_NOT_FOUND':
            error = 'an email is was not found';
            break;

            case 'INVALID_PASSWORD':
            error = 'password isnt corrent';
            break;

            case 'USER_DISABLED':
            error = 'The user account has been disabled by an administrator'
            break;
        }
        return throwError(error); // returns observabe
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/Authentication'])
        localStorage.removeItem('userData')
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration:number) {
       this.tokenExpirationTimer =  setTimeout(() => {
            this.logout();
        } , expirationDuration)
    }

    autoLogin(){
        const userData:{
            email:string , 
            id:string , 
            _token:string , 
            _tokenExpired:string
        } = JSON.parse(localStorage.getItem('userData'))

        console.log(userData); // if no user yet , no sign up or log in 
        
        if(!userData) {
            return;
        } 

        const loadedUser = new User (
            userData.email ,
            userData.id  , 
            userData._token , 
            new Date(userData._tokenExpired)

        )

        if(loadedUser.token) { // in other words , ONLY if user is signed up or loged in he has token.
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpired).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration);
        }
    }
}