import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from './../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm:FormGroup;
  
  constructor(
    private route:ActivatedRoute , 
    private recipeService:RecipeService , 
    private router:Router
    ) { }
  

  id:number;
  editMode = false;
  ngOnInit(): void {

    this.route.params
    .subscribe(
      (params:Params) => {
        this.id = +params['id']
        this.editMode = params['id'] != null      
        this.initForm() // call when id is change          
      }
    )
  }

  private initForm() {
    let recipeName = ''
    let description = ''
    let recipeImagePath  = ''
    let recipeIngredients  = new FormArray([])

    if(this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id)
      
      recipeName = recipe.name  // the default value
      description = recipe.description
      recipeImagePath = recipe.imagePath

      if(recipe['ingredients']) {   // checks if recipe has ingredient property
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name':new FormControl(ingredient.name , Validators.required) , 
            'amount':new FormControl(ingredient.amount , [
              Validators.required , 
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName , Validators.required) , // the name changes to the new value
      'description': new FormControl(description , Validators.required) ,
      'imagePath': new FormControl(recipeImagePath , Validators.required) , 
      'ingredients': recipeIngredients
    })
    // console.log(this.recipeForm);
    
    

  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'] , 
      this.recipeForm.value['description'] ,
      this.recipeForm.value['imagePath'] ,
      this.recipeForm.value['ingredients'])
      
      // console.log(newRecipe);
      
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id , newRecipe )
    } 
    else {
      this.recipeService.addRecipe(newRecipe)
    }
    this.router.navigate(['../'] , {relativeTo:this.route})
  }

  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {

    const ingredientsArray = (<FormArray>this.recipeForm.get('ingredients'))
    const control = new FormGroup({
      'name':new FormControl(null , Validators.required) , 
      'amount':new FormControl([
        Validators.required , 
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
    ingredientsArray.push(control)
  }

  onCancel() {
    this.router.navigate(['../'] , {relativeTo:this.route})
  }

  onDeleteIngredient(index : number) {
    const ingredientsArray = (<FormArray>this.recipeForm.get('ingredients'))
    ingredientsArray.removeAt(index)
  }


}
