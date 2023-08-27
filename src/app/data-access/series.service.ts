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
        return seriesResponse.series;
      }),
    );
  }

  getEpisodeById(episodeId: number): Observable<Episode | undefined> {
    return this._fetchAllData().pipe(
      map((seriesResponse: SeriesResponse) => {
        return seriesResponse.episode.find(
          (episode: Episode) => Number(episode.id) === episodeId,
        );
      }),
    );
  }

  getNextEpisodeIdById(episodeId: number): Observable<string | undefined> {
    return this._fetchAllData().pipe(
      map((seriesResponse: SeriesResponse) => {
        const episodeIndex = seriesResponse.episode.findIndex(
          (episode: Episode) => Number(episode.id) === episodeId,
        );

        return seriesResponse.episode[episodeIndex + 1]?.id;
      }),
    );
  }

  getPreviousEpisodeIdById(episodeId: number): Observable<string | undefined> {
    return this._fetchAllData().pipe(
      map((seriesResponse: SeriesResponse) => {
        const episodeIndex = seriesResponse.episode.findIndex(
          (episode: Episode) => Number(episode.id) === episodeId,
        );

        return seriesResponse.episode[episodeIndex - 1]?.id;
      }),
    );
  }

  getEpisodesBySeason(seasonId: number): Observable<Episode[]> {
    return this._fetchAllData().pipe(
      map((seriesResponse: SeriesResponse) => {
        return seriesResponse.episode.filter((episode: Episode) => {
          return Number(episode.SeasonNumber) === seasonId;
        });
      }),
    );
  }

  getAllSeasons(): Observable<number[]> {
    return this._fetchAllData().pipe(
      map((seriesResponse: SeriesResponse) => {
        const seasons: number[] = [];
        seriesResponse.episode.forEach((episode: Episode) => {
          const seasonNumber: number = Number(episode.SeasonNumber);
          if (!seasons.includes(seasonNumber)) {
            seasons.push(seasonNumber);
          }
        });
        return seasons;
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
        map(
          (
            seriesResponse: SeriesResponse & {
              Series: Series;
              Episode: Episode[];
            },
          ) => {
            return <SeriesResponse>{
              ...(seriesResponse as SeriesResponse),
              series: {
                ...seriesResponse.Series,
                Actors: convertStringToArrayWithSplit(
                  seriesResponse.Series.Actors as unknown as string,
                  '|',
                ),
                Genre: convertStringToArrayWithSplit(
                  seriesResponse.Series.Genre as unknown as string,
                  '|',
                ),
              },
              episode: seriesResponse.Episode,
            };
          },
        ),
        shareReplay(1),
      );
  }
}

export function convertStringToArrayWithSplit(
  originalString: string,
  splitBy: string,
): string[] {
  return originalString
    .split(splitBy)
    .filter((item: string) => item.trim().length > 0)
    .map((item: string) => item.trim());
}
