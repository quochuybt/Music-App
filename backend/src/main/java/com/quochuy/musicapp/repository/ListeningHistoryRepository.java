package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.ListeningHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ListeningHistoryRepository extends JpaRepository<ListeningHistory, Long> {
    List<ListeningHistory> findByUserIdOrderByListenedAtDesc(Long userId);
    Optional<ListeningHistory> findByUserIdAndSongId(Long userId, Long songId);
    void deleteByUserId(Long userId);
}
