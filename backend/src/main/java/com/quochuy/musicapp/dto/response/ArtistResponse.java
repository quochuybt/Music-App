package com.quochuy.musicapp.dto.response;

import com.quochuy.musicapp.enums.CommonStatus;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class ArtistResponse {
    private Long id;
    private String name;
    private String imageUrl;
    private String bio;
    private CommonStatus status;
}
