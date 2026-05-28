package com.quochuy.musicapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "playlists")
public class Playlist {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; }
    @PreUpdate void preUpdate() { updatedAt = LocalDateTime.now(); }
}
