import type {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from 'src/app/shared/notification-service';
import { HttpErrorsEnum } from '../constants/http-errors.enum';


@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) { }

  intercept<T, K>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<K>> {
    if (request.url.includes('analytics')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpErrorsEnum.InternalServerError) {
          this.notificationService.showErrorMessage();

          return EMPTY;
        }

        return throwError(error);
      }),
    );
  }
}
