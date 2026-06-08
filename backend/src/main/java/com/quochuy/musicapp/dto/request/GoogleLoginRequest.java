package com.quochuy.musicapp.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GoogleLoginRequest {
    @NotBlank
    private String idToken;
}
