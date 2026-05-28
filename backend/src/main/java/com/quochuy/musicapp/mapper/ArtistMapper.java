package com.quochuy.musicapp.mapper;

import com.quochuy.musicapp.dto.response.ArtistResponse;
import com.quochuy.musicapp.entity.Artist;

public class ArtistMapper {
    public static ArtistResponse toResponse(Artist artist) {
        return ArtistResponse.builder().id(artist.getId()).name(artist.getName())
                .imageUrl(artist.getImageUrl()).bio(artist.getBio()).status(artist.getStatus()).build();
    }
}
