package com.quochuy.musicapp.entity;

import jakarta.persistence.Embeddable;
import lombok.*;
import java.io.Serializable;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @EqualsAndHashCode
@Embeddable
public class PlaylistSongId implements Serializable {
    private Long playlistId;
    private Long songId;
}
