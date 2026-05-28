package com.quochuy.musicapp.dto.request;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
public class SongRequest {
    @NotBlank
    private String title;
    @NotNull
    private Long artistId;
    private Long albumId;
    @NotNull
    private Long genreId;
    @NotBlank
    private String imageUrl;
    private String audioUrl;
    @NotBlank
    private String duration;
    private String description;
    private CommonStatus status;
}
