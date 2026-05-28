package com.quochuy.musicapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "favorites")
public class Favorite {
    @EmbeddedId
    private FavoriteId id;
    @ManyToOne(fetch = FetchType.LAZY) @MapsId("userId") @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY) @MapsId("songId") @JoinColumn(name = "song_id")
    private Song song;
    private LocalDateTime createdAt;
    @PrePersist void prePersist() { createdAt = LocalDateTime.now(); }
}
