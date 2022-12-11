import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { exhaustMap, pluck, take } from "rxjs/operators";

import type * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private readonly store: Store<fromApp.AppState>,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
