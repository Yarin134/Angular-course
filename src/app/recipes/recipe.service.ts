import { Subject } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService{
  //Array<string> 
  recipesChanged = new Subject<Recipe[]>(); // for the recipes array to be updated

    // public recipes:Recipe[] = [  
    // new Recipe('testRecipe1'
    // , 'test description1',
    // 'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg'
    // , [new ingredient('chease' , 2) , 
    //     new ingredient('peperoni' , 2)])
    //  ,  new Recipe('testRecipe2' 
    //  , 'test description2'
    //  , 'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg'
    //  , [new ingredient('cucamber' , 5) , 
    //  new ingredient('peperoni' , 6)] )
    //  ,  new Recipe('testRecipe3' 
    //  , 'test description3'
    //  ,  'https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg'
    // ,  [new ingredient('tomato' , 2) , 
    //   new ingredient('pepper' , 12)])
    // ];

    public recipes:Recipe[]

    getRecipes() {
        return this.recipes;
    }

    getRecipeById(id) {
      return this.recipes[id]
    }

    addRecipe(recipe : Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
    }

    updateRecipe(index: number , newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice())
    }

    setRecipes(recipes: Recipe[]) {
      this.recipes = recipes
      this.recipesChanged.next(this.recipes.slice()); // emit an event because the recipes array changed
    }
  
}