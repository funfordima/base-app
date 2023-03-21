import type { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth/services/auth.service';
import { IS_MOBILE_BREAKPOINT } from './core/providers/is-mobile-breakpoint.token';
import { SubSink } from './shared/utils/subsink.util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isMobile = false;
  private subs = new SubSink();

  constructor(
    @Inject(IS_MOBILE_BREAKPOINT) private readonly isMobileBreakpoint$: Observable<boolean>,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin();

    this.subs.sink = this.isMobileBreakpoint$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });
  }
}
