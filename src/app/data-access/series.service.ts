import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Episode, Series, SeriesResponse } from '../models/series';

const PAGE_SIZE = 20;

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  constructor(private _httpClient: HttpClient) {}

  getSeriesInfo(): Observable<Series> {
    return this._fetchAllData().pipe(
      map((seriesResponse: SeriesResponse) => {
        return seriesResponse.Series;
      }),
    );
  }

  getEpisodes({ page }: { page: number } = { page: 1 }): Observable<Episode[]> {
    if (page < 1) {
      throw new Error('Page must be greater than 0');
    }

    return this._fetchAllData().pipe(
      map((seriesResponse: SeriesResponse) => {
        return seriesResponse.Episode.slice(
          (page - 1) * PAGE_SIZE,
          page * PAGE_SIZE,
        );
      }),
    );
  }

  private _fetchAllData(): Observable<SeriesResponse> {
    const headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    return this._httpClient
      .get('assets/json/simpsons.json', {
        headers,
        responseType: 'text',
      })
      .pipe(
        map((response: string) => JSON.parse(response)),
        map((seriesResponse: unknown) => {
          return seriesResponse as SeriesResponse;
        }),
        shareReplay(1),
      );
  }
}
