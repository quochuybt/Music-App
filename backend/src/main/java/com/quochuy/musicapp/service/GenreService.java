package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.request.GenreRequest;
import com.quochuy.musicapp.dto.response.GenreResponse;
import com.quochuy.musicapp.entity.Genre;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.exception.*;
import com.quochuy.musicapp.mapper.GenreMapper;
import com.quochuy.musicapp.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;
    public Page<GenreResponse> publicList(Pageable pageable) { return genreRepository.findByStatus(CommonStatus.ACTIVE, pageable).map(GenreMapper::toResponse); }
    public Page<GenreResponse> adminList(Pageable pageable) { return genreRepository.findAll(pageable).map(GenreMapper::toResponse); }
    public Genre getEntity(Long id) { return genreRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Genre not found")); }
    public GenreResponse getPublic(Long id) {
        Genre genre = getEntity(id);
        if (genre.getStatus() != CommonStatus.ACTIVE) throw new ResourceNotFoundException("Genre not found");
        return GenreMapper.toResponse(genre);
    }
    public GenreResponse getAdmin(Long id) { return GenreMapper.toResponse(getEntity(id)); }
    public GenreResponse create(GenreRequest request) {
        if (genreRepository.existsByNameIgnoreCase(request.getName())) throw new BadRequestException("Genre name already exists");
        return GenreMapper.toResponse(genreRepository.save(Genre.builder().name(request.getName()).description(request.getDescription())
                .status(request.getStatus() == null ? CommonStatus.ACTIVE : request.getStatus()).build()));
    }
    public GenreResponse update(Long id, GenreRequest request) {
        Genre genre = getEntity(id);
        genre.setName(request.getName()); genre.setDescription(request.getDescription());
        if (request.getStatus() != null) genre.setStatus(request.getStatus());
        return GenreMapper.toResponse(genreRepository.save(genre));
    }
    public void delete(Long id) { genreRepository.delete(getEntity(id)); }
    public GenreResponse updateStatus(Long id, CommonStatus status) { Genre genre = getEntity(id); genre.setStatus(status); return GenreMapper.toResponse(genreRepository.save(genre)); }
}
