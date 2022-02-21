import { ShoppingListService } from './../shopping-list.service';
import { ingredient } from './../../shared/ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {

@ViewChild('form' , {static:false}) shoppingListForm:NgForm  // for accessing the form
subscription:Subscription;
editMode = false
editItemIndex:number
editItem:ingredient

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing
    .subscribe( 
      (index : number ) => {
        this.editMode = true;
        this.editItemIndex = index
        this.editItem = this.shoppingListService.getIngredient(this.editItemIndex)
        // console.log(this.editItem);
        this.shoppingListForm.setValue({
          name: this.editItem.name , 
          amount: this.editItem.amount
        })
    })
  }

  onSubmitItem(form:NgForm) {
    const value = form.value
    const newIngredient = new ingredient(value.name , value.amount)
    if(this.editMode == false) {
      this.shoppingListService.addToIngredientArray(new ingredient( value.name , value.amount ))  
    } else {
      this.shoppingListService.updateIngredients(newIngredient , this.editItemIndex)
    }
    this.editMode = false;  // every time the btn was pressed editMode back to false 
    form.reset()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onClear() {
    this.shoppingListForm.reset()
    this.editMode = false; // for the button to be add again and no update 
  }

  onDeleteItem() {
     this.shoppingListService.deleteItem(this.editItemIndex)
     this.onClear() // because when im pressing the ingredient it becomes to true (editMode)
  }

 
}
