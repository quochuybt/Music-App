package com.quochuy.musicapp.mapper;

import com.quochuy.musicapp.dto.response.AlbumResponse;
import com.quochuy.musicapp.entity.Album;

public class AlbumMapper {
    public static AlbumResponse toResponse(Album album) {
        return AlbumResponse.builder()
                .id(album.getId()).title(album.getTitle()).imageUrl(album.getImageUrl())
                .releaseYear(album.getReleaseYear()).description(album.getDescription())
                .artistId(album.getArtist() == null ? null : album.getArtist().getId())
                .artistName(album.getArtist() == null ? null : album.getArtist().getName())
                .status(album.getStatus()).build();
    }
}
