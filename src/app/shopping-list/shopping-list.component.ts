import { ShoppingListService } from './shopping-list.service';
import { ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'] , 
})
export class ShoppingListComponent implements OnInit  , OnDestroy{

  ingredients:ingredient[] = []
  private igChangeSubscription:Subscription // for relading the current (in real time) array of ingredients (storing the subscription of the ingredientChanged in the service )

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    
     this.igChangeSubscription =  this.shoppingListService.ingredientsChanged.subscribe( 
      (ingredients:ingredient[]) => this.ingredients = ingredients
    )
  }

  ngOnDestroy() {
    this.igChangeSubscription.unsubscribe()
  }

  onEditItem(index : number) {
    this.shoppingListService.startEditing.next(index)
  }




}
