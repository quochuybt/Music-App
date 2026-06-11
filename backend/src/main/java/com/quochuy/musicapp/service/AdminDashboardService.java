package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.DashboardStatsResponse;
import com.quochuy.musicapp.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class AdminDashboardService {
    private final SongRepository songRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional(readOnly = true)
    public DashboardStatsResponse stats() {
        Object[] counts = (Object[]) entityManager.createNativeQuery("""
                select
                  (select count(*) from songs) as total_songs,
                  (select count(*) from artists) as total_artists,
                  (select count(*) from albums) as total_albums,
                  (select count(*) from genres) as total_genres,
                  (select count(*) from users) as total_users,
                  (select count(*) from playlists) as total_playlists
                """).getSingleResult();

        return DashboardStatsResponse.builder()
                .totalSongs(asLong(counts[0]))
                .totalArtists(asLong(counts[1]))
                .totalAlbums(asLong(counts[2]))
                .totalGenres(asLong(counts[3]))
                .totalUsers(asLong(counts[4]))
                .totalPlaylists(asLong(counts[5]))
                .mostFavoriteSong(songRepository.findMostFavoriteResponses(PageRequest.of(0, 1)).stream().findFirst().orElse(null))
                .mostPlayedSong(songRepository.findMostPlayedResponses(PageRequest.of(0, 1)).stream().findFirst().orElse(null))
                .build();
    }

    private long asLong(Object value) {
        return ((Number) value).longValue();
    }
}
