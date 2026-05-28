package com.quochuy.musicapp.mapper;

import com.quochuy.musicapp.dto.response.*;
import com.quochuy.musicapp.entity.Playlist;
import java.util.List;

public class PlaylistMapper {
    public static PlaylistResponse toResponse(Playlist playlist, List<SongResponse> songs) {
        return PlaylistResponse.builder().id(playlist.getId()).name(playlist.getName())
                .description(playlist.getDescription()).songs(songs).build();
    }
}
