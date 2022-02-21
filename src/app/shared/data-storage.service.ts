import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';

@Injectable({
    providedIn:'root'
})
export class DataStorageService {
    
constructor(private http: HttpClient ,
     private recipeService: RecipeService ,
      private authService:AuthService) {}

storeRecipes() {

    const recipes:Recipe[] = this.recipeService.getRecipes()

    return this.http
    .put('https://ng-course-recipe-book-d15df-default-rtdb.firebaseio.com/recipes.json' ,recipes)
}

fetchRecipe() {
    return this.http
    .get<Recipe[]>('https://ng-course-recipe-book-d15df-default-rtdb.firebaseio.com/recipes.json')
    .pipe(tap(recipes => {
        this.recipeService.setRecipes(recipes); // related to the data return from the get request
    }))
 
} // the response will be from type Recipe array
//pipe return an observable

}

//fetchData => 
// exhaustMap(overrides the current observable , the user of the behaviorSubject , and send new 
//which is the http observable)
//before that , the take operator takes the first user  , and the second pipe is getting the data from
// the get request before the subscription.