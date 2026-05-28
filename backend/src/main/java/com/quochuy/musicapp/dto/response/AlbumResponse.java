package com.quochuy.musicapp.dto.response;

import com.quochuy.musicapp.enums.CommonStatus;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class AlbumResponse {
    private Long id;
    private String title;
    private String imageUrl;
    private Integer releaseYear;
    private String description;
    private Long artistId;
    private String artistName;
    private CommonStatus status;
}
