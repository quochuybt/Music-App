package com.quochuy.musicapp.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "playlist_songs")
public class PlaylistSong {
    @EmbeddedId
    private PlaylistSongId id;
    @ManyToOne(fetch = FetchType.LAZY) @MapsId("playlistId") @JoinColumn(name = "playlist_id")
    private Playlist playlist;
    @ManyToOne(fetch = FetchType.LAZY) @MapsId("songId") @JoinColumn(name = "song_id")
    private Song song;
    private LocalDateTime addedAt;
    @PrePersist void prePersist() { addedAt = LocalDateTime.now(); }
}
