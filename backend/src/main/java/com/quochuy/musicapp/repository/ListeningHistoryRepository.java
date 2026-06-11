package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.dto.response.SongResponse;
import com.quochuy.musicapp.entity.ListeningHistory;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ListeningHistoryRepository extends JpaRepository<ListeningHistory, Long> {
    List<ListeningHistory> findByUserIdOrderByListenedAtDesc(Long userId);

    @Query("""
            select new com.quochuy.musicapp.dto.response.SongResponse(
                s.id, s.title, s.imageUrl, s.audioUrl, s.duration, s.description,
                ar.id, ar.name, a.id, a.title, g.id, g.name, s.status, s.playCount
            )
            from ListeningHistory h
            join h.song s
            join s.artist ar
            join s.genre g
            left join s.album a
            where h.user.id = :userId
            order by h.listenedAt desc
            """)
    List<SongResponse> findSongResponsesByUserIdOrderByListenedAtDesc(@Param("userId") Long userId);

    Optional<ListeningHistory> findByUserIdAndSongId(Long userId, Long songId);
    void deleteByUserId(Long userId);
    @Modifying
    @Query(value = "delete from listening_history where song_id = :songId", nativeQuery = true)
    void deleteAllBySongId(@Param("songId") Long songId);
}
