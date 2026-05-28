package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.Genre;
import com.quochuy.musicapp.enums.CommonStatus;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {
    boolean existsByNameIgnoreCase(String name);
    Page<Genre> findByStatus(CommonStatus status, Pageable pageable);
}
