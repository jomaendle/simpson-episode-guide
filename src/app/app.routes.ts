import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./feature/series-overview/series-overview.component').then(
        (m) => m.SeriesOverviewComponent,
      ),
  },
  {
    path: 'season/:seasonId',
    pathMatch: 'full',
    loadComponent: () =>
      import('./feature/season-overview/season-overview.component').then(
        (m) => m.SeasonOverviewComponent,
      ),
  },
];
