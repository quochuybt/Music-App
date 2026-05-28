package com.quochuy.musicapp.entity;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "songs")
public class Song {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 150)
    private String title;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    @Column(columnDefinition = "TEXT")
    private String audioUrl;
    private String duration;
    @Column(columnDefinition = "TEXT")
    private String description;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "artist_id", nullable = false)
    private Artist artist;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "album_id")
    private Album album;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "genre_id", nullable = false)
    private Genre genre;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommonStatus status;
    @Column(nullable = false)
    private Long playCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; if (status == null) status = CommonStatus.ACTIVE; if (playCount == null) playCount = 0L; }
    @PreUpdate void preUpdate() { updatedAt = LocalDateTime.now(); }
}
