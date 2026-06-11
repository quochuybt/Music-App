package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.request.SongRequest;
import com.quochuy.musicapp.dto.response.SongResponse;
import com.quochuy.musicapp.entity.*;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.exception.ResourceNotFoundException;
import com.quochuy.musicapp.mapper.SongMapper;
import com.quochuy.musicapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final ArtistService artistService;
    private final AlbumService albumService;
    private final GenreService genreService;
    private final FavoriteRepository favoriteRepository;
    private final PlaylistSongRepository playlistSongRepository;
    private final ListeningHistoryRepository listeningHistoryRepository;

    @Transactional(readOnly = true)
    public Page<SongResponse> publicSearch(Long genreId, Long artistId, Long albumId, String keyword, Pageable pageable) {
        return songRepository.searchResponses(CommonStatus.ACTIVE, artistId, albumId, genreId, blankToNull(keyword), newestFirst(pageable));
    }
    @Transactional(readOnly = true)
    public Page<SongResponse> adminList(Pageable pageable) { return songRepository.findAll(newestFirst(pageable)).map(SongMapper::toResponse); }
    @Transactional(readOnly = true)
    public Page<SongResponse> byArtist(Long id, Pageable pageable) { return songRepository.searchResponses(CommonStatus.ACTIVE, id, null, null, null, newestFirst(pageable)); }
    @Transactional(readOnly = true)
    public Page<SongResponse> byAlbum(Long id, Pageable pageable) { return songRepository.searchResponses(CommonStatus.ACTIVE, null, id, null, null, newestFirst(pageable)); }
    @Transactional(readOnly = true)
    public Page<SongResponse> byGenre(Long id, Pageable pageable) { return songRepository.searchResponses(CommonStatus.ACTIVE, null, null, id, null, newestFirst(pageable)); }
    public Song getEntity(Long id) { return songRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Song not found")); }
    public Song getActiveEntity(Long id) { return songRepository.findByIdAndStatus(id, CommonStatus.ACTIVE).orElseThrow(() -> new ResourceNotFoundException("Song not found")); }
    @Transactional(readOnly = true)
    public SongResponse getPublic(Long id) { return songRepository.findResponseByIdAndStatus(id, CommonStatus.ACTIVE).orElseThrow(() -> new ResourceNotFoundException("Song not found")); }
    @Transactional(readOnly = true)
    public SongResponse getAdmin(Long id) { return SongMapper.toResponse(getEntity(id)); }
    @Transactional
    public SongResponse create(SongRequest request) { return SongMapper.toResponse(songRepository.save(apply(Song.builder().playCount(0L).build(), request))); }
    @Transactional
    public SongResponse update(Long id, SongRequest request) { return SongMapper.toResponse(songRepository.save(apply(getEntity(id), request))); }
    @Transactional
    public void delete(Long id) {
        Song song = getEntity(id);
        favoriteRepository.deleteAllBySongId(id);
        playlistSongRepository.deleteAllBySongId(id);
        listeningHistoryRepository.deleteAllBySongId(id);
        songRepository.delete(song);
    }
    @Transactional
    public SongResponse updateStatus(Long id, CommonStatus status) { Song song = getEntity(id); song.setStatus(status); return SongMapper.toResponse(songRepository.save(song)); }
    @Transactional
    public void incrementPlayCount(Song song) { song.setPlayCount(song.getPlayCount() + 1); songRepository.save(song); }
    private Song apply(Song song, SongRequest request) {
        song.setTitle(request.getTitle()); song.setImageUrl(request.getImageUrl()); song.setAudioUrl(request.getAudioUrl());
        song.setDuration(request.getDuration()); song.setDescription(request.getDescription());
        song.setArtist(artistService.getEntity(request.getArtistId()));
        song.setAlbum(request.getAlbumId() == null ? null : albumService.getEntity(request.getAlbumId()));
        song.setGenre(genreService.getEntity(request.getGenreId()));
        song.setStatus(request.getStatus() == null ? CommonStatus.ACTIVE : request.getStatus());
        return song;
    }
    private String blankToNull(String value) { return value == null || value.isBlank() ? null : value; }

    private Pageable newestFirst(Pageable pageable) {
        if (pageable.getSort().isSorted()) return pageable;
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
