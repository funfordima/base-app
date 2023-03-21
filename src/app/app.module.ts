import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { AlertComponent } from './shared/notification-service/components/alert/alert.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth/interceptors/auth-interceptor.service';
import { ErrorInterceptorService } from './core/interceptors/error-interceptor.service';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe-list/services/recipe.service';
import { NotificationModule } from './shared/notification-service';
import { DropDownDirective } from './shared/utils/drop-down.directive';
import { PlaceholderDirective } from './shared/utils/placeholder.directive';
import { ShoppingListService } from './shopping-list/services/shopping-list.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropDownDirective,
    PlaceholderDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NotificationModule,
    MatSlideToggleModule,
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  // FIXME: old version
  // entryComponents: [AlertComponent],
})
export class AppModule { }
