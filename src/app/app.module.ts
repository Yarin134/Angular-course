import { ShoppingListService } from './shopping-list/shopping-list.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing-module';
import { RecipeService } from './recipes/recipe.service';
import{ HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AuthComponent } from './auth/auth.component';
import { LoadingPinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
     AppComponent,
     HeaderComponent,
     DropdownDirective, 
     AuthComponent , 
     LoadingPinnerComponent , 
     AlertComponent ,
     PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    NgbModule , 
    FormsModule , 
    ReactiveFormsModule , 
    AppRoutingModule ,
    HttpClientModule , 
    RecipesModule , 
    ShoppingListModule
  ],
  providers: [
    ShoppingListService, 
    RecipeService , 
    {provide: HTTP_INTERCEPTORS , useClass :AuthInterceptorService , multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
