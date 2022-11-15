import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Recipe } from "src/app/recipes/models/recipe.model";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class DataStorageApiService {
  constructor(
    private readonly http: HttpClient,
  ) { }

  storeRecipes(recipes: Recipe[]): Observable<Recipe[]> {
    return this.http.put<Recipe[]>(`${environment.api.fireBaseUrl} + recipes.json`, recipes);
    // TODO: One possible way to add token to your requests
    // return this.authService.user$.pipe(
    //   take(1),
    //   exhaustMap((userData) => this.http.put<Recipe[]>(`${environment.api.fireBaseUrl} + recipes.json`, recipes,
    //     {
    //       params: new HttpParams().set('auth', userData?.token ?? ''),
    //     }
    //   )),
    // );
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.api.fireBaseUrl} + recipes.json`);
  }
}
