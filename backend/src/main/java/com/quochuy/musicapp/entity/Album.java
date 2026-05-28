package com.quochuy.musicapp.entity;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "albums")
public class Album {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    private Integer releaseYear;
    @Column(columnDefinition = "TEXT")
    private String description;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "artist_id")
    private Artist artist;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommonStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; if (status == null) status = CommonStatus.ACTIVE; }
    @PreUpdate void preUpdate() { updatedAt = LocalDateTime.now(); }
}
