import { Component, signal, WritableSignal } from '@angular/core';
import { SeriesService } from '../../data-access/series.service';
import { LetDirective } from '@ngrx/component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ComponentStore } from '@ngrx/component-store';
import { Episode } from '../../models/series';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export interface SeriesOverviewState {
  episodes: Episode[];
}

const INITIAL_STATE: SeriesOverviewState = {
  episodes: [],
};

@Component({
  selector: 'app-series-overview',
  standalone: true,
  imports: [LetDirective, RouterLink, NgForOf, AsyncPipe],
  template: `
    <div *ngrxLet="series$ as series">
      <h1>{{ series.SeriesName }}</h1>
      <p class="text-sm text-gray-400">{{ series.Overview }}</p>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 lg:w-1/3">
          <div class="bg-gray-800 rounded-lg p-4">
            <h2 class="text-xl text-gray-100">Seasons</h2>
            <ul class="list-disc list-inside text-gray-300">
              <li *ngFor="let episode of episodes$ | async">
                <a [routerLink]="['/season', episode.EpisodeNumber]">
                  <span>
                    {{ episode.EpisodeNumber }}x{{ episode.SeasonNumber }}
                  </span>
                  <span class="text-gray-400">{{ episode.EpisodeName }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <button (click)="loadNextPage()">Load Next Page</button>
      </div>
    </div>
  `,
  styleUrls: ['./series-overview.component.scss'],
})
export class SeriesOverviewComponent extends ComponentStore<any> {
  currentPage: WritableSignal<number> = signal(1);

  series$ = this._seriesService.getSeriesInfo();

  episodes$ = this.select((state) => state.episodes);

  loadEpisodes = this.effect((trigger$) => {
    return combineLatest([
      trigger$,
      toObservable<number>(this.currentPage).pipe(distinctUntilChanged()),
    ]).pipe(
      debounceTime(0),

      switchMap(([_, page]: [void, number]) =>
        this._seriesService
          .getEpisodes({
            page,
          })
          .pipe(
            tap((episodes: Episode[]) => {
              console.log('episodes', episodes);

              if (page === 1) {
                this.patchState({ episodes });
                return;
              }

              this.patchState((state) => ({
                episodes: [...state.episodes, ...episodes],
              }));
            }),
          ),
      ),
    );
  });

  constructor(private _seriesService: SeriesService) {
    super(INITIAL_STATE);
    this._init();
  }

  private _init(): void {
    this.loadEpisodes();
  }

  loadNextPage(): void {
    this.currentPage.update((page) => page + 1);
  }
}
