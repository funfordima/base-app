import type { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";

import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user$.pipe(
      take(1),
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
