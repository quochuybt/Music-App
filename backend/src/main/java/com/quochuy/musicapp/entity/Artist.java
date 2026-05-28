package com.quochuy.musicapp.entity;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "artists")
public class Artist {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    @Column(columnDefinition = "TEXT")
    private String bio;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommonStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; if (status == null) status = CommonStatus.ACTIVE; }
    @PreUpdate void preUpdate() { updatedAt = LocalDateTime.now(); }
}
