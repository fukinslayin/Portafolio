import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StarWarsApiService {
  public imageBaseUrl: string =
    'https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/';
  private baseUrl: string = 'https://swapi.dev/api/people/';
  constructor(private http: HttpClient) {}

  private getQuery(page: number, query: string = '') {
    let params = new HttpParams().set('page', page.toString());
    if (query) {
      params = params.set('search', query);
    }
    return this.http.get(this.baseUrl, { params });
  }

  public getCharacters(page: number = 1, rows: number = 6, query: string) {
    return this.getQuery(page, query).pipe(
      map((data: any) => {
        return {
          results: data.results.slice(0, rows),
          count: data.count,
        };
      })
    );
  }
}
