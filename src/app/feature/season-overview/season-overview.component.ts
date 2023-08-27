import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../data-access/series.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { LetDirective } from '@ngrx/component';
import { Episode, Season } from '../../models/series';

@Component({
  selector: 'app-season-overview',
  standalone: true,
  imports: [CommonModule, LetDirective, RouterLink],
  templateUrl: './season-overview.component.html',
  styleUrls: ['./season-overview.component.scss'],
  host: {
    class: 'flex flex-col gap-4',
  },
})
export class SeasonOverviewComponent {
  readonly season$: Observable<Season> = this._activatedRoute.paramMap.pipe(
    map((params) => params.get('seasonId')),
    switchMap((seasonId: string | null) =>
      this._seriesService
        .getEpisodesBySeason(coerceNumberProperty(seasonId))
        .pipe(
          map((episodes: Episode[]) => {
            return <Season>{
              seasonId: Number(seasonId),
              episodes,
            };
          }),
        ),
    ),
  );

  constructor(
    private _seriesService: SeriesService,
    private _activatedRoute: ActivatedRoute,
  ) {}
}
