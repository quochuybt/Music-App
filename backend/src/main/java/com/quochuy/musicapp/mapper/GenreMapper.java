package com.quochuy.musicapp.mapper;

import com.quochuy.musicapp.dto.response.GenreResponse;
import com.quochuy.musicapp.entity.Genre;

public class GenreMapper {
    public static GenreResponse toResponse(Genre genre) {
        return GenreResponse.builder().id(genre.getId()).name(genre.getName())
                .description(genre.getDescription()).status(genre.getStatus()).build();
    }
}
