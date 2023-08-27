export interface SeriesResponse {
  Episode: Episode[];
  Series: Series;
}

export interface Episode {
  id: string;
  Combined_episodenumber: string;
  Combined_season: string;
  DVD_chapter: any[];
  DVD_discid: any[] | string;
  DVD_episodenumber: any[] | string;
  DVD_season: any[] | string;
  Director: any[] | string;
  EpImgFlag: any[] | string;
  EpisodeName: string;
  EpisodeNumber: string;
  FirstAired: any[] | Date;
  GuestStars: any[] | string;
  IMDB_ID: any[] | string;
  Language: Language;
  Overview: any[] | string;
  ProductionCode: any[] | string;
  Rating: any[] | string;
  RatingCount: string;
  SeasonNumber: string;
  Writer: any[] | string;
  absolute_number: any[] | string;
  airsafter_season?: any[] | string;
  airsbefore_episode?: any[] | string;
  airsbefore_season?: any[] | string;
  filename: any[] | string;
  is_movie: string;
  lastupdated: string;
  seasonid: string;
  seriesid: string;
  thumb_added: any[] | Date;
  thumb_height: any[] | string;
  thumb_width: any[] | string;
}

export enum Language {
  En = 'en',
}

export interface Series {
  id: string;
  Actors: string;
  Airs_DayOfWeek: string;
  Airs_Time: string;
  ContentRating: string;
  FirstAired: Date;
  Genre: string;
  IMDB_ID: string;
  Language: Language;
  Network: string;
  NetworkID: any[];
  Overview: string;
  Rating: string;
  RatingCount: string;
  Runtime: string;
  SeriesID: string;
  SeriesName: string;
  Status: string;
  added: any[];
  addedBy: any[];
  banner: string;
  fanart: string;
  finale_aired: Date;
  lastupdated: string;
  poster: string;
  tms_wanted_old: string;
  zap2it_id: string;
}
