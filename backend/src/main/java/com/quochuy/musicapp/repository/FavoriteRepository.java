package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.*;
import org.springframework.data.jpa.repository.*;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
    List<Favorite> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Favorite> findByUserIdAndSongId(Long userId, Long songId);
    boolean existsByUserIdAndSongId(Long userId, Long songId);
    void deleteByUserIdAndSongId(Long userId, Long songId);

    @Query(value = "select s.* from songs s join favorites f on f.song_id = s.id group by s.id order by count(*) desc limit 1", nativeQuery = true)
    Optional<Song> findMostFavoriteSong();
}
