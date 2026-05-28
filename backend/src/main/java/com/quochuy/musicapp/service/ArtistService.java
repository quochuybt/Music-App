package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.request.ArtistRequest;
import com.quochuy.musicapp.dto.response.ArtistResponse;
import com.quochuy.musicapp.entity.Artist;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.exception.ResourceNotFoundException;
import com.quochuy.musicapp.mapper.ArtistMapper;
import com.quochuy.musicapp.repository.ArtistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class ArtistService {
    private final ArtistRepository artistRepository;

    public Page<ArtistResponse> publicList(Pageable pageable) {
        return artistRepository.findByStatus(CommonStatus.ACTIVE, pageable).map(ArtistMapper::toResponse);
    }
    public Page<ArtistResponse> adminList(Pageable pageable) { return artistRepository.findAll(pageable).map(ArtistMapper::toResponse); }
    public Artist getEntity(Long id) { return artistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Artist not found")); }
    public ArtistResponse getPublic(Long id) {
        Artist artist = getEntity(id);
        if (artist.getStatus() != CommonStatus.ACTIVE) throw new ResourceNotFoundException("Artist not found");
        return ArtistMapper.toResponse(artist);
    }
    public ArtistResponse getAdmin(Long id) { return ArtistMapper.toResponse(getEntity(id)); }
    public ArtistResponse create(ArtistRequest request) {
        Artist artist = Artist.builder().name(request.getName()).imageUrl(request.getImageUrl()).bio(request.getBio())
                .status(request.getStatus() == null ? CommonStatus.ACTIVE : request.getStatus()).build();
        return ArtistMapper.toResponse(artistRepository.save(artist));
    }
    public ArtistResponse update(Long id, ArtistRequest request) {
        Artist artist = getEntity(id);
        artist.setName(request.getName()); artist.setImageUrl(request.getImageUrl()); artist.setBio(request.getBio());
        if (request.getStatus() != null) artist.setStatus(request.getStatus());
        return ArtistMapper.toResponse(artistRepository.save(artist));
    }
    public void delete(Long id) { artistRepository.delete(getEntity(id)); }
    public ArtistResponse updateStatus(Long id, CommonStatus status) {
        Artist artist = getEntity(id); artist.setStatus(status); return ArtistMapper.toResponse(artistRepository.save(artist));
    }
}
