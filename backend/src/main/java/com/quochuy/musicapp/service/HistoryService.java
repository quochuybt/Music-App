package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.SongResponse;
import com.quochuy.musicapp.entity.*;
import com.quochuy.musicapp.mapper.SongMapper;
import com.quochuy.musicapp.repository.ListeningHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service @RequiredArgsConstructor
public class HistoryService {
    private final ListeningHistoryRepository historyRepository;
    private final SongService songService;
    private final CurrentUserService currentUserService;

    public List<SongResponse> mine() {
        return historyRepository.findByUserIdOrderByListenedAtDesc(currentUserService.get().getId()).stream()
                .map(ListeningHistory::getSong).map(SongMapper::toResponse).toList();
    }
    public SongResponse savePlay(Long songId) {
        User user = currentUserService.get();
        Song song = songService.getEntity(songId);
        ListeningHistory history = historyRepository.findByUserIdAndSongId(user.getId(), songId)
                .orElse(ListeningHistory.builder().user(user).song(song).build());
        history.setListenedAt(LocalDateTime.now());
        historyRepository.save(history);
        songService.incrementPlayCount(song);
        return SongMapper.toResponse(song);
    }
    @Transactional
    public void clear() { historyRepository.deleteByUserId(currentUserService.get().getId()); }
}
