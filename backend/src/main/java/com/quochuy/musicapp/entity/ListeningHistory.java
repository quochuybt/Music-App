package com.quochuy.musicapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "listening_history",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "song_id"}),
        indexes = @Index(name = "idx_history_user_listened_at", columnList = "user_id, listened_at"))
public class ListeningHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "song_id", nullable = false)
    private Song song;
    private LocalDateTime listenedAt;
    @PrePersist void prePersist() { listenedAt = LocalDateTime.now(); }
}
