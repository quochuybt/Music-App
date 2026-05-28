package com.quochuy.musicapp.dto.request;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
public class GenreRequest {
    @NotBlank
    private String name;
    private String description;
    private CommonStatus status;
}
