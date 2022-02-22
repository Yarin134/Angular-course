import { NgModule } from "@angular/core";
import { Routes } from '@angular/router';
import { AuthGuardService } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { RouterModule } from '@angular/router';

const routes:Routes = [
    {path: 'Recipes'  , component: RecipesComponent, canActivate:[AuthGuardService] , children: [
        {path: '' , component: RecipeStartComponent} , 
        {path: 'new' , component: RecipeEditComponent} , 
        {path: ':id' , component: RecipeDetailComponent , resolve: [RecipeResolverService]} , 
        {path: ':id/edit' , component: RecipeEditComponent, resolve: [RecipeResolverService]} 
    ] } 
]

@NgModule({
imports:[RouterModule.forChild(routes)]  , 
exports:[RouterModule]
})
export class RecipeRoutingModule{

}