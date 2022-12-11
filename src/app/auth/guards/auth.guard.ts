import { Injectable } from "@angular/core";
import type { CanActivate, UrlTree } from "@angular/router";
import { Router } from "@angular/router";
import type { Observable } from "rxjs";
import { map, pluck, take } from "rxjs/operators";

import type * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly store: Store<fromApp.AppState>,
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
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
    );
  }
}
