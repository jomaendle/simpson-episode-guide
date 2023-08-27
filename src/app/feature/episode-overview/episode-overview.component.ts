import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Episode } from '../../models/series';
import { SeriesService } from '../../data-access/series.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { LetDirective } from '@ngrx/component';
import { InfoFieldComponent } from '../../ui';

@Component({
  selector: 'app-episode-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, LetDirective, InfoFieldComponent],
  templateUrl: './episode-overview.component.html',
  styleUrls: ['./episode-overview.component.scss'],
})
export class EpisodeOverviewComponent {
  episode$: Observable<Episode | undefined> = this._route.paramMap.pipe(
    switchMap((params: ParamMap) => {
      const episodeId = coerceNumberProperty(params.get('episodeId'));

      return this._seriesService.getEpisodeById(episodeId);
    }),
  );

  nextEpisodeId$: Observable<string | undefined> = this.episode$.pipe(
    switchMap((episode: Episode | undefined) => {
      if (!episode) {
        return of(undefined);
      }

      return this._seriesService.getNextEpisodeIdById(Number(episode.id));
    }),
    tap((nextEpisodeId: string | undefined) => {
      console.log(nextEpisodeId);
    }),
  );

  previousEpisodeId$: Observable<string | undefined> = this.episode$.pipe(
    switchMap((episode: Episode | undefined) => {
      if (!episode) {
        return of(undefined);
      }

      return this._seriesService.getPreviousEpisodeIdById(Number(episode.id));
    }),
  );

  constructor(
    private _seriesService: SeriesService,
    private _route: ActivatedRoute,
  ) {}
}
