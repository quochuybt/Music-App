package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.SongResponse;
import com.quochuy.musicapp.entity.*;
import com.quochuy.musicapp.exception.BadRequestException;
import com.quochuy.musicapp.mapper.SongMapper;
import com.quochuy.musicapp.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final SongService songService;
    private final CurrentUserService currentUserService;

    public List<SongResponse> mine() {
        return favoriteRepository.findByUserIdOrderByCreatedAtDesc(currentUserService.get().getId()).stream()
                .map(Favorite::getSong).map(SongMapper::toResponse).toList();
    }
    public SongResponse add(Long songId) {
        User user = currentUserService.get();
        if (favoriteRepository.existsByUserIdAndSongId(user.getId(), songId)) throw new BadRequestException("Song already favorited");
        Song song = songService.getEntity(songId);
        favoriteRepository.save(Favorite.builder().id(new FavoriteId(user.getId(), songId)).user(user).song(song).build());
        return SongMapper.toResponse(song);
    }
    @Transactional
    public void remove(Long songId) { favoriteRepository.deleteByUserIdAndSongId(currentUserService.get().getId(), songId); }
    public boolean check(Long songId) { return favoriteRepository.existsByUserIdAndSongId(currentUserService.get().getId(), songId); }
}
