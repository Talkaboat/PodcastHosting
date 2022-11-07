import { Episode } from "../episode.model";

export interface PlaylistTrack {
  playlistTrackId?: number;
  playlistId: number;
  created: Date;
  episodeId: number;
  episode?: Episode;
  position: number;
}
