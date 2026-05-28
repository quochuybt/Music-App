package com.quochuy.musicapp.mapper;

import com.quochuy.musicapp.dto.response.SongResponse;
import com.quochuy.musicapp.entity.Song;

public class SongMapper {
    public static SongResponse toResponse(Song song) {
        return SongResponse.builder()
                .id(song.getId()).title(song.getTitle()).imageUrl(song.getImageUrl()).audioUrl(song.getAudioUrl())
                .duration(song.getDuration()).description(song.getDescription())
                .artistId(song.getArtist().getId()).artistName(song.getArtist().getName())
                .albumId(song.getAlbum() == null ? null : song.getAlbum().getId())
                .albumTitle(song.getAlbum() == null ? null : song.getAlbum().getTitle())
                .genreId(song.getGenre().getId()).genreName(song.getGenre().getName())
                .status(song.getStatus()).playCount(song.getPlayCount()).build();
    }
}
