package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.request.AlbumRequest;
import com.quochuy.musicapp.dto.response.AlbumResponse;
import com.quochuy.musicapp.entity.*;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.exception.ResourceNotFoundException;
import com.quochuy.musicapp.mapper.AlbumMapper;
import com.quochuy.musicapp.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class AlbumService {
    private final AlbumRepository albumRepository;
    private final ArtistService artistService;
    public Page<AlbumResponse> publicList(Pageable pageable) { return albumRepository.findByStatus(CommonStatus.ACTIVE, pageable).map(AlbumMapper::toResponse); }
    public Page<AlbumResponse> adminList(Pageable pageable) { return albumRepository.findAll(pageable).map(AlbumMapper::toResponse); }
    public Page<AlbumResponse> byArtist(Long artistId, Pageable pageable) { return albumRepository.findByArtistIdAndStatus(artistId, CommonStatus.ACTIVE, pageable).map(AlbumMapper::toResponse); }
    public Album getEntity(Long id) { return albumRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Album not found")); }
    public AlbumResponse getPublic(Long id) {
        Album album = getEntity(id);
        if (album.getStatus() != CommonStatus.ACTIVE) throw new ResourceNotFoundException("Album not found");
        return AlbumMapper.toResponse(album);
    }
    public AlbumResponse getAdmin(Long id) { return AlbumMapper.toResponse(getEntity(id)); }
    public AlbumResponse create(AlbumRequest request) { return AlbumMapper.toResponse(albumRepository.save(apply(Album.builder().build(), request))); }
    public AlbumResponse update(Long id, AlbumRequest request) { return AlbumMapper.toResponse(albumRepository.save(apply(getEntity(id), request))); }
    public void delete(Long id) { albumRepository.delete(getEntity(id)); }
    public AlbumResponse updateStatus(Long id, CommonStatus status) { Album album = getEntity(id); album.setStatus(status); return AlbumMapper.toResponse(albumRepository.save(album)); }
    private Album apply(Album album, AlbumRequest request) {
        album.setTitle(request.getTitle()); album.setImageUrl(request.getImageUrl()); album.setReleaseYear(request.getReleaseYear());
        album.setDescription(request.getDescription());
        album.setArtist(request.getArtistId() == null ? null : artistService.getEntity(request.getArtistId()));
        album.setStatus(request.getStatus() == null ? CommonStatus.ACTIVE : request.getStatus());
        return album;
    }
}
