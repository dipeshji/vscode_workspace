import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HeaderComponent } from "./header/header.component";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppingListService } from "./shooping-list/shopping-list.service";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { SharedModule } from "./Shared/shared.module";
import { shoppingListReducer } from "./shooping-list/store/shopping-list.reducer";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer,
    }),
  ],
  providers: [
    RecipeService,
    ShoppingListService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
