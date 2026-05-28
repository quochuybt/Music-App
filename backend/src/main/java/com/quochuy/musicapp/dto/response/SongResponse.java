package com.quochuy.musicapp.dto.response;

import com.quochuy.musicapp.enums.CommonStatus;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class SongResponse {
    private Long id;
    private String title;
    private String imageUrl;
    private String audioUrl;
    private String duration;
    private String description;
    private Long artistId;
    private String artistName;
    private Long albumId;
    private String albumTitle;
    private Long genreId;
    private String genreName;
    private CommonStatus status;
    private Long playCount;
}
