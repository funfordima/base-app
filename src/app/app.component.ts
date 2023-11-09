import type { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth/services/auth.service';
import { IS_MOBILE_BREAKPOINT } from './core/providers/is-mobile-breakpoint.token';
import { SubSink } from './shared/utils/subsink.util';
import { AlphabeticalListItemContext } from './shared/alphabetical-list/models/item-context.interface';

interface Item {
  readonly id: number;
  readonly name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private isMobile = false;
  private subs = new SubSink();

  readonly contextType!: AlphabeticalListItemContext<Item>;
  readonly data: Item[] = [
    { id: 1, name: 'Angular' },
    { id: 2, name: 'Backend' },
    { id: 3, name: 'Business Analyst' },
    { id: 4, name: 'C++ Developer' },
    { id: 5, name: 'Devops' },
    { id: 6, name: 'Frontend' },
    { id: 7, name: 'Fullstack Developer' },
  ];

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

  labelHandler = (item: Item) => item.name;
}
