package com.quochuy.musicapp.dto.request;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
public class RegisterRequest {
    @NotBlank
    private String fullName;
    @Email @NotBlank
    private String email;
    @Size(min = 6)
    private String password;
    @Size(min = 6)
    private String confirmPassword;
}
