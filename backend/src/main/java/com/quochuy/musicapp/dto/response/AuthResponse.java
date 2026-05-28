package com.quochuy.musicapp.dto.response;

import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class AuthResponse {
    private String token;
    private UserResponse user;
}
