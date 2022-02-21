import { ingredient } from './../../shared/ingredient.model';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from './../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipeFromRecipes:Recipe
 id:number
 
 constructor(private ingredientService:ShoppingListService , 
  private route:ActivatedRoute , 
  private router:Router,
  private recipeService:RecipeService) { }
  

  ngOnInit(): void {

   this.route.params
   .subscribe (
     (params:Params) => {
       this.id = +params['id']  // after url changes
       this.recipeFromRecipes = this.recipeService.getRecipeById(this.id)
      }
      )
//listen to recipe array changes . if someone delete a recipe


    console.log(this.recipeFromRecipes);
    
  }

  onAddIngredients(ingredients) {  // ingredients is an array
    for(let ingredientFromList of ingredients)
    {
      this.ingredientService.addToIngredientArray(new ingredient(ingredientFromList.name , ingredientFromList.amount))     
    }

  }

  onEdit() {
    console.log(this.id);
    this.router.navigate(['edit'] , {relativeTo:this.route})
  }

  onDeleteRecipe() {
    const recipes:Recipe[] = this.recipeService.getRecipes()
    recipes.splice(this.id , 1);
    this.recipeService.recipes = recipes
    this.recipeService.recipesChanged.next(recipes.slice()) // let the event know about the deletion of this recipe
    this.router.navigate(['../'] , {relativeTo:this.route})
  }

  onDeleteIngredients(recipe:Recipe) {

    recipe.ingredients.splice(0)
  }
}











