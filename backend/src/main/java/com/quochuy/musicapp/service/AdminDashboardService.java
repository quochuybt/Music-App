package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.DashboardStatsResponse;
import com.quochuy.musicapp.mapper.SongMapper;
import com.quochuy.musicapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class AdminDashboardService {
    private final SongRepository songRepository;
    private final ArtistRepository artistRepository;
    private final AlbumRepository albumRepository;
    private final GenreRepository genreRepository;
    private final UserRepository userRepository;
    private final PlaylistRepository playlistRepository;
    private final FavoriteRepository favoriteRepository;

    public DashboardStatsResponse stats() {
        return DashboardStatsResponse.builder()
                .totalSongs(songRepository.count())
                .totalArtists(artistRepository.count())
                .totalAlbums(albumRepository.count())
                .totalGenres(genreRepository.count())
                .totalUsers(userRepository.count())
                .totalPlaylists(playlistRepository.count())
                .mostFavoriteSong(favoriteRepository.findMostFavoriteSong().map(SongMapper::toResponse).orElse(null))
                .mostPlayedSong(songRepository.findFirstByOrderByPlayCountDesc().map(SongMapper::toResponse).orElse(null))
                .build();
    }
}
