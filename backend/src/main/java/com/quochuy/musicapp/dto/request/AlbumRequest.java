package com.quochuy.musicapp.dto.request;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
public class AlbumRequest {
    @NotBlank
    private String title;
    private String imageUrl;
    private Integer releaseYear;
    private String description;
    private Long artistId;
    private CommonStatus status;
}
