import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { Router } from '@angular/router';
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth' ,
    templateUrl: './auth.component.html'
})

export class AuthComponent{

constructor(private authService: AuthService  , private router:Router , private componentFactoryResolver:ComponentFactoryResolver) {}

    isLogginMode = true;
    isLoading = false;
    error : string = null;
    @ViewChild(PlaceHolderDirective, {static:false}) alertHost:PlaceHolderDirective
    private closeSub:Subscription

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

        let authObservable: Observable<AuthResponseData> // AuthResponseData is what coming back from the observable

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
                // this.showErrorAlert(fullErrorRes)
                this.isLoading = false;
                
            })

            form.reset();
        
        
    }

    onHandleError(){
        this.error = null;
    }

    // private showErrorAlert(fullErrorRes) {
    //     const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    //     const hostViewContainerRef = this.alertHost.viewContainerRef;
    //     hostViewContainerRef.clear();
    //     const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    //     componentRef.instance.message = fullErrorRes;
    //     this.closeSub = componentRef.instance.close.subscribe(() => {
    //         this.closeSub.unsubscribe(); 
    //         hostViewContainerRef.clear(); // clear all the content there
    //     })
    // }

    // ngOnDestroy(): void {
    //     if(this.closeSub) {
    //         this.closeSub.unsubscribe();
    //     }
    // }
}