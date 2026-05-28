package com.quochuy.musicapp.dto.response;

import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class DashboardStatsResponse {
    private long totalSongs;
    private long totalArtists;
    private long totalAlbums;
    private long totalGenres;
    private long totalUsers;
    private long totalPlaylists;
    private SongResponse mostFavoriteSong;
    private SongResponse mostPlayedSong;
}
