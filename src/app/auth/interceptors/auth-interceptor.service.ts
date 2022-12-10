import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { exhaustMap, pluck, take } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly store: Store<fromApp.AppState>,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // return this.authService.user$.pipe(
    return this.store.select('auth').pipe(
      take(1),
      pluck('user'),
      exhaustMap((userData) => {
        if (!userData) {
          return next.handle(request);
        }

        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', userData?.token ?? ''),
        });

        return next.handle(modifiedReq);
      }),
    );
  }
}
