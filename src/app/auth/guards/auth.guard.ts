import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, pluck, take } from "rxjs/operators";

import { AuthService } from "../services/auth.service";
import * as fromApp from '../../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>,
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    // return this.authService.user$.pipe(
    return this.store.select('auth').pipe(
      take(1),
      pluck('user'),
      map((userData) => {
        const isAuth = !!userData;

        if (isAuth) {
          return true;
        }

        return this.router.createUrlTree(['/auth']);
      }),
      // FIXME: old approach
      // tap((userData) => {
      //   if (!userData) {
      //     this.router.navigate(['/auth']);
      //   }
      // }),
    );
  }
}
