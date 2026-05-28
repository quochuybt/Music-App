package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaylistSongRepository extends JpaRepository<PlaylistSong, PlaylistSongId> {
    List<PlaylistSong> findByPlaylistIdOrderByAddedAtDesc(Long playlistId);
    boolean existsByPlaylistIdAndSongId(Long playlistId, Long songId);
    void deleteByPlaylistIdAndSongId(Long playlistId, Long songId);
    void deleteByPlaylistId(Long playlistId);
}
