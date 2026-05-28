package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.Album;
import com.quochuy.musicapp.enums.CommonStatus;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlbumRepository extends JpaRepository<Album, Long> {
    Page<Album> findByStatus(CommonStatus status, Pageable pageable);
    Page<Album> findByArtistIdAndStatus(Long artistId, CommonStatus status, Pageable pageable);
}
