package com.quochuy.musicapp.entity;

import com.quochuy.musicapp.enums.Role;
import com.quochuy.musicapp.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 100)
    private String fullName;
    @Column(nullable = false, unique = true, length = 150)
    private String email;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    @Column(columnDefinition = "TEXT")
    private String avatarUrl;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void prePersist() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
        if (role == null) role = Role.USER;
        if (status == null) status = UserStatus.ACTIVE;
    }

    @PreUpdate
    void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
