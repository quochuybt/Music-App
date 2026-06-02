package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.request.PlaylistRequest;
import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.entity.*;
import com.quochuy.musicapp.exception.*;
import com.quochuy.musicapp.mapper.*;
import com.quochuy.musicapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service @RequiredArgsConstructor
public class PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final PlaylistSongRepository playlistSongRepository;
    private final SongService songService;
    private final CurrentUserService currentUserService;

    @Transactional(readOnly = true)
    public List<PlaylistResponse> mine() {
        Long userId = currentUserService.get().getId();
        return playlistRepository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(this::toResponse).toList();
    }
    @Transactional(readOnly = true)
    public PlaylistResponse get(Long id) { return toResponse(myPlaylist(id)); }
    @Transactional
    public PlaylistResponse create(PlaylistRequest request) {
        Playlist playlist = Playlist.builder().name(request.getName()).description(request.getDescription()).user(currentUserService.get()).build();
        return toResponse(playlistRepository.save(playlist));
    }
    @Transactional
    public PlaylistResponse update(Long id, PlaylistRequest request) {
        Playlist playlist = myPlaylist(id);
        playlist.setName(request.getName()); playlist.setDescription(request.getDescription());
        return toResponse(playlistRepository.save(playlist));
    }
    @Transactional
    public void delete(Long id) {
        Playlist playlist = myPlaylist(id);
        playlistSongRepository.deleteByPlaylistId(playlist.getId());
        playlistRepository.delete(playlist);
    }
    @Transactional
    public PlaylistResponse addSong(Long playlistId, Long songId) {
        Playlist playlist = myPlaylist(playlistId);
        if (playlistSongRepository.existsByPlaylistIdAndSongId(playlistId, songId)) throw new BadRequestException("Song already exists in playlist");
        Song song = songService.getActiveEntity(songId);
        playlistSongRepository.save(PlaylistSong.builder().id(new PlaylistSongId(playlistId, songId)).playlist(playlist).song(song).build());
        return toResponse(playlist);
    }
    @Transactional
    public PlaylistResponse removeSong(Long playlistId, Long songId) {
        Playlist playlist = myPlaylist(playlistId);
        playlistSongRepository.deleteByPlaylistIdAndSongId(playlistId, songId);
        return toResponse(playlist);
    }
    private Playlist myPlaylist(Long id) {
        return playlistRepository.findByIdAndUserId(id, currentUserService.get().getId()).orElseThrow(() -> new ResourceNotFoundException("Playlist not found"));
    }
    private PlaylistResponse toResponse(Playlist playlist) {
        List<SongResponse> songs = playlistSongRepository.findByPlaylistIdOrderByAddedAtDesc(playlist.getId()).stream()
                .map(PlaylistSong::getSong).map(SongMapper::toResponse).toList();
        return PlaylistMapper.toResponse(playlist, songs);
    }
}
