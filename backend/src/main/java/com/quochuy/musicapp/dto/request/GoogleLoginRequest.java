package com.quochuy.musicapp.dto.request;

import lombok.*;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GoogleLoginRequest {
    private String idToken;
    private String accessToken;
}
