package com.quochuy.musicapp.dto.response;

import lombok.*;
import java.util.List;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class PlaylistResponse {
    private Long id;
    private String name;
    private String description;
    private List<SongResponse> songs;
}
