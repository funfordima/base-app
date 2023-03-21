import type { BreakpointState } from '@angular/cdk/layout';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import type { CustomBreakpointQueries } from './breakpoints.service';
import { BreakpointsService } from './breakpoints.service';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  activeBreakpoints$: Observable<string[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private breakpointService: BreakpointsService,
  ) {
    this.activeBreakpoints$ = this.breakpointObserver
      .observe(this.breakpointService.getCustomBreakpoints())
      .pipe(
        map((observeResponse: BreakpointState) =>
          Object.keys(observeResponse.breakpoints).reduce(
            (activeBreakpoints: string[], key: string) => {
              if (observeResponse.breakpoints[key]) {
                activeBreakpoints.push(this.breakpointService.getBreakpointName(key));
              }
              return activeBreakpoints;
            },
            [] as string[],
          ),
        ),
        shareReplay(1),
      );
  }

  isBreakpointActiveInstant(breakpointQuery: CustomBreakpointQueries | string): boolean {
    return this.breakpointObserver.isMatched(breakpointQuery);
  }

  isBreakpointMediaActive(
    breakpointQuery: CustomBreakpointQueries | string,
  ): Observable<BreakpointState> {
    return this.breakpointObserver.observe(breakpointQuery);
  }

  isBreakpointActive(breakpointName: string): Observable<boolean> {
    return this.activeBreakpoints$.pipe(
      map((activeBreakpoints: string[]) =>
        activeBreakpoints.some((breakpoint: string) => breakpoint === breakpointName),
      ),
    );
  }
}
