package com.quochuy.musicapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
public class PlaylistRequest {
    @NotBlank
    private String name;
    private String description;
}
