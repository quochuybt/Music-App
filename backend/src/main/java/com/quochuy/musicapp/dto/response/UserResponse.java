package com.quochuy.musicapp.dto.response;

import com.quochuy.musicapp.enums.*;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private Role role;
    private String avatarUrl;
    private UserStatus status;
}
