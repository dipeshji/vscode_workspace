import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../Shared/data-storage.service";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import { map } from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select("auth")
      .pipe(map((userState) => userState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetch() {
    this.dataStorage.fetchRecipe().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}