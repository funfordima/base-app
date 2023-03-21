import { Injectable } from '@angular/core';

export const CUSTOM_BREAKPOINT_NAMES = {
  mobile: 'mobile',
  extraLarge: 'extraLarge',
};

export enum CustomBreakpointQueries {
  Mobile = '(max-width: 960px)',
  ExtraLarge = '(min-width: 1920px)',
}

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  breakpoints: Record<string, string> = {
    [CustomBreakpointQueries.Mobile]: CUSTOM_BREAKPOINT_NAMES.mobile,
    [CustomBreakpointQueries.ExtraLarge]: CUSTOM_BREAKPOINT_NAMES.extraLarge,
  };

  getCustomBreakpoints(): string[] {
    return Object.keys(this.breakpoints);
  }

  getBreakpointName(breakpointValue: string): string {
    return this.breakpoints[breakpointValue];
  }
}
