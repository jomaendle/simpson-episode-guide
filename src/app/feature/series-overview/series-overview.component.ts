import { Component } from '@angular/core';
import { SeriesService } from '../../data-access/series.service';
import { LetDirective } from '@ngrx/component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { ComponentStore } from '@ngrx/component-store';
import { Series } from '../../models/series';
import { Observable, switchMap, tap } from 'rxjs';
import { TagSectionComponent } from './tag-section/tag-section.component';
import { InfoFieldComponent } from './info-field/info-field.component';

export interface SeriesOverviewState {
  series?: Series | undefined;
  allSeasons: number[];
}

const INITIAL_STATE: SeriesOverviewState = {
  series: undefined,
  allSeasons: [],
};

@Component({
  selector: 'app-series-overview',
  standalone: true,
  imports: [
    LetDirective,
    RouterLink,
    NgForOf,
    AsyncPipe,
    NgIf,
    JsonPipe,
    TagSectionComponent,
    InfoFieldComponent,
    DatePipe,
  ],
  template: `
    <ng-container *ngrxLet="series$ as series">
      <div *ngIf="series" class="flex flex-col gap-4">
        <h2>{{ series.SeriesName }}</h2>
        <p class="text-sm text-gray-400">{{ series.Overview }}</p>

        <app-tag-section
          title="Actors"
          [tags]="series.Actors"
        ></app-tag-section>
        <app-tag-section title="Genre" [tags]="series.Genre"></app-tag-section>
        <div class="flex gap-4 bg-slate-800 p-2 rounded-md">
          <app-info-field
            label="Air Day"
            [value]="series.Airs_DayOfWeek"
          ></app-info-field>

          <app-info-field
            label="Air Time"
            [value]="series.Airs_Time"
          ></app-info-field>
        </div>
        <div class="flex gap-4">
          <app-info-field
            label="Rating"
            [value]="series.Rating"
          ></app-info-field>

          <app-info-field
            label="Ratings"
            [value]="series.RatingCount"
          ></app-info-field>

          <app-info-field
            label="Network"
            [value]="series.Network"
          ></app-info-field>

          <app-info-field
            label="Status"
            [value]="series.Status"
          ></app-info-field>
        </div>
        <div class="flex flex-wrap mt-4">
          <div
            class="w-full h-full md:w-1/2 lg:w-1/3 flex flex-1 card flex-col gap-4"
          >
            <h2 class="text-xl text-gray-100">Seasons</h2>
            <ul
              class="list-none text-gray-300 list-inside grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 "
            >
              <a
                *ngFor="let season of seasons$ | async"
                [routerLink]="['/season', season]"
              >
                <li
                  class="bg-slate-700 rounded-md px-2 py-4 hover:bg-slate-600 cursor-pointer"
                >
                  <span> Season {{ season }} </span>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./series-overview.component.scss'],
})
export class SeriesOverviewComponent extends ComponentStore<any> {
  series$: Observable<Series> = this.select((state) => state.series);
  seasons$: Observable<number[]> = this.select((state) => state.allSeasons);

  loadSeries = this.effect((trigger$) => {
    return trigger$.pipe(
      switchMap(() =>
        this._seriesService.getSeriesInfo().pipe(
          tap((series: Series) => {
            this.patchState({ series });
          }),
        ),
      ),
    );
  });

  loadSeasons = this.effect((trigger$) => {
    return trigger$.pipe(
      switchMap(() =>
        this._seriesService.getAllSeasons().pipe(
          tap((allSeasons: number[]) => {
            this.patchState({ allSeasons });
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
    this.loadSeries();
    this.loadSeasons();
  }
}
