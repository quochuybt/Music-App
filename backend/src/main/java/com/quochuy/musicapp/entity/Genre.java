package com.quochuy.musicapp.entity;

import com.quochuy.musicapp.enums.CommonStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
@Entity @Table(name = "genres")
public class Genre {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 100)
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CommonStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist void prePersist() { createdAt = LocalDateTime.now(); updatedAt = createdAt; if (status == null) status = CommonStatus.ACTIVE; }
    @PreUpdate void preUpdate() { updatedAt = LocalDateTime.now(); }
}
