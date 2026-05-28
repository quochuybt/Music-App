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

@Service @RequiredArgsConstructor
public class SongService {
    private final SongRepository songRepository;
    private final ArtistService artistService;
    private final AlbumService albumService;
    private final GenreService genreService;

    public Page<SongResponse> publicSearch(Long genreId, Long artistId, Long albumId, String keyword, Pageable pageable) {
        return songRepository.search(CommonStatus.ACTIVE, artistId, albumId, genreId, blankToNull(keyword), pageable).map(SongMapper::toResponse);
    }
    public Page<SongResponse> adminList(Pageable pageable) { return songRepository.findAll(pageable).map(SongMapper::toResponse); }
    public Page<SongResponse> byArtist(Long id, Pageable pageable) { return songRepository.findByArtistIdAndStatus(id, CommonStatus.ACTIVE, pageable).map(SongMapper::toResponse); }
    public Page<SongResponse> byAlbum(Long id, Pageable pageable) { return songRepository.findByAlbumIdAndStatus(id, CommonStatus.ACTIVE, pageable).map(SongMapper::toResponse); }
    public Page<SongResponse> byGenre(Long id, Pageable pageable) { return songRepository.findByGenreIdAndStatus(id, CommonStatus.ACTIVE, pageable).map(SongMapper::toResponse); }
    public Song getEntity(Long id) { return songRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Song not found")); }
    public SongResponse getPublic(Long id) { return SongMapper.toResponse(songRepository.findByIdAndStatus(id, CommonStatus.ACTIVE).orElseThrow(() -> new ResourceNotFoundException("Song not found"))); }
    public SongResponse getAdmin(Long id) { return SongMapper.toResponse(getEntity(id)); }
    public SongResponse create(SongRequest request) { return SongMapper.toResponse(songRepository.save(apply(Song.builder().playCount(0L).build(), request))); }
    public SongResponse update(Long id, SongRequest request) { return SongMapper.toResponse(songRepository.save(apply(getEntity(id), request))); }
    public void delete(Long id) { songRepository.delete(getEntity(id)); }
    public SongResponse updateStatus(Long id, CommonStatus status) { Song song = getEntity(id); song.setStatus(status); return SongMapper.toResponse(songRepository.save(song)); }
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
}
