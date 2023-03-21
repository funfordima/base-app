import { inject, InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';

import { CUSTOM_BREAKPOINT_NAMES } from '../services/breakpoints.service';
import { LayoutService } from '../services/layout.service';

export const IS_MOBILE_BREAKPOINT = new InjectionToken<Observable<boolean>>(
  'Is Mobile breakpoint provider',
  {
    providedIn: 'root',
    factory: () => inject(LayoutService).isBreakpointActive(CUSTOM_BREAKPOINT_NAMES.mobile),
  },
);
