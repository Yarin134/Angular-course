import { Component, OnDestroy, OnInit, Output} from '@angular/core';
import {Router } from '@angular/router';
import { DataStorageService } from './../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  private UserSubscription:Subscription
  isAuthenticated = false;

  constructor(private route:Router , private dataStorage:DataStorageService  , private authService:AuthService) { }

  ngOnInit(): void {
    this.UserSubscription = this.authService.user.subscribe( user => {
      console.log(this.isAuthenticated);
      this.isAuthenticated = !user ? false : true; // 2 options- null or full user.
      console.log(user);
      console.log(this.isAuthenticated);
    })
  }
  ngOnDestroy(): void {
      this.UserSubscription.unsubscribe();
  }

  
  RecipeNavigation() {
    this.route.navigate(['/Recipes'])
  }
  ShoppingListNavigation() {
    this.route.navigate(['/ShoppingList'])

  }

  saveData(){
      this.dataStorage.storeRecipes()
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchData() {
    this.dataStorage.fetchRecipe()
    .subscribe()

  }

  logout() {
    this.authService.logout();
  }

}
