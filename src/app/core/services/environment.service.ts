import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Nullable } from 'src/app/models/nullable.type';
import { EnvironmentsNameEnum } from 'src/environments/constants/environments-name.enum';
import { EnvironmentModel } from 'src/environments/models/environment.model';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  private envName: Nullable<EnvironmentsNameEnum>;

  constructor(
    private httpClient: HttpClient,
  ) { }

  getEnvironment(): Observable<EnvironmentModel> {
    return this.httpClient.get<EnvironmentModel>('environment.json').pipe(
      tap((environmentData) => {
        this.envName = environmentData.name;

        this.logEnvironmentValues(environmentData);
      }),
    );
  }

  getName(): EnvironmentsNameEnum {
    return this.envName ?? EnvironmentsNameEnum.Dev;
  }

  private logEnvironmentValues(environment: EnvironmentModel): void {
    console.warn('environment is', environment.name);
    console.warn('version of FE is', environment.version);
  }
}
