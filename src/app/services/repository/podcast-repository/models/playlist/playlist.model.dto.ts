import { PlaylistTrack } from "./playlist-track.model.dto";

export interface Playlist {
  playlistId: number;
  name: string;
  image?: string;
  tracks?: PlaylistTrack[];
}
