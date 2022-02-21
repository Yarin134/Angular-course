import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector:'app-auth' ,
    templateUrl: './auth.component.html'
})

export class AuthComponent{

constructor(private authService: AuthService  , private router:Router) {}

    isLogginMode = true;
    isLoading = false;
    error : string = null;

    onSwitchMode() {
        this.isLogginMode = !this.isLogginMode
    }

    onSubmit(form: NgForm) {
        
        if(!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        let authObservable: Observable<AuthResponseData>

        if(this.isLogginMode) {
            
            authObservable =  this.authService.login(email , password)

        } else {

            authObservable = this.authService.signUp(email , password)
        }
         

            authObservable.subscribe(responseData => {  
                // we are getting the data only if the sign in was succeed
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/Recipes'])
                
            } , fullErrorRes => {  // contains the message in the observable we returned in (switch case)
                console.log(fullErrorRes);
                this.error = fullErrorRes;
                
                this.isLoading = false;
                
            })

            form.reset();
        
        
    }
}