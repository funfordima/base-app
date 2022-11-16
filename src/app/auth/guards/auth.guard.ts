import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.user$.pipe(
      take(1),
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
