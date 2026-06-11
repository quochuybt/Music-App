package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
    List<Favorite> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<Favorite> findByUserIdAndSongId(Long userId, Long songId);
    boolean existsByUserIdAndSongId(Long userId, Long songId);
    void deleteByUserIdAndSongId(Long userId, Long songId);
    @Modifying
    @Query(value = "delete from favorites where song_id = :songId", nativeQuery = true)
    void deleteAllBySongId(@Param("songId") Long songId);

    @Query(value = "select song_id from favorites group by song_id order by count(*) desc limit 1", nativeQuery = true)
    Optional<Long> findMostFavoriteSongId();
}
