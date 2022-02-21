import { FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { textChangeRangeIsUnchanged } from 'typescript';
import { ingredient } from './../shared/ingredient.model';

export class ShoppingListService {

ingredientsChanged = new Subject();

startEditing = new Subject<number>(); // for passing the index of the current ingredients

    ingredients:ingredient[] = [
        new ingredient('Apples' , 5) , 
        new ingredient('Bananas' , 5) , 
        new ingredient('Tomatos' , 5) , 
      ];

      
      getIngredients() {
          return this.ingredients.slice()
        }
        addToIngredientArray(ingredient:ingredient) {
          this.ingredients.push(ingredient)
          this.ingredientsChanged.next(this.ingredients.slice())
        }

        getIngredient(index : number) {
          return this.ingredients[index];
        }

        updateIngredients(newIngredient: ingredient , index: number) {
          this.ingredients[index] = newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice())
        }

        deleteItem(index: number) {
          this.ingredients.splice(index , 1);
          this.ingredientsChanged.next(this.ingredients.slice())    

        }

        
    }