import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

  recipes:Recipe[];
  subscription:Subscription

  constructor(private recipeService:RecipeService ,
     private route:Router ,
      private router:ActivatedRoute , 
      ) { }

  ngOnInit() {
    // this.recipes = this.recipeService.getRecipes(); // reloads the recipes in the beggining

    this.subscription = this.recipeService.recipesChanged // every time the recipesCahnged was emitted (next)
    .subscribe(
      (updatedRecipes:Recipe[]) => {   // enable to update the recipes array to the newest value(listen to recipes array changes)
        this.recipes = updatedRecipes // and update the recipes shown in the left side 
        console.log(this.recipes); 
      }
    )
  }

  onNewRecipe() {    
     this.route.navigate(['new'] , {relativeTo:this.router})

     
      // from any place , if someone clicks , he navigae to Recipes/new
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }





}
