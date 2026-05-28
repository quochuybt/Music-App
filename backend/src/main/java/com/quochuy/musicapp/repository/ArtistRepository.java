package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.Artist;
import com.quochuy.musicapp.enums.CommonStatus;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {
    Page<Artist> findByStatus(CommonStatus status, Pageable pageable);
    long countByStatus(CommonStatus status);
}
