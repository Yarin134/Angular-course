import { RecipeService } from './recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'] , 
})
export class RecipesComponent implements OnInit {
  
  selectedRecipe:Recipe;
  
  constructor() { }

  ngOnInit(): void {
  
  }

  // recipe is equal to the parameter in emit methode



 




}
