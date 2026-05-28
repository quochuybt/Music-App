package com.quochuy.musicapp.dto.request;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
public class ArtistRequest {
    @NotBlank
    private String name;
    private String imageUrl;
    private String bio;
    private CommonStatus status;
}
