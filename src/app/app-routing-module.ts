import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";



const appRoutes :Routes = [
    {path:'' , redirectTo: '/Recipes' , pathMatch:'full'} ,  // empty path is a part of every path
    {path: 'Authentication' , component:AuthComponent}
    

]
  @NgModule({
    imports: [
  RouterModule.forRoot(appRoutes)
    ] , 
    exports: [RouterModule]
})
export class AppRoutingModule {
}