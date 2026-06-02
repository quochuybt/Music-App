package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, PlaylistSongId> {
    List<PlaylistSong> findByPlaylistIdOrderByAddedAtDesc(Long playlistId);
    boolean existsByPlaylistIdAndSongId(Long playlistId, Long songId);
    void deleteByPlaylistIdAndSongId(Long playlistId, Long songId);
    void deleteByPlaylistId(Long playlistId);
    @Modifying
    @Query(value = "delete from playlist_songs where song_id = :songId", nativeQuery = true)
    void deleteAllBySongId(@Param("songId") Long songId);
}
