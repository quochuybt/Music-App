package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.Song;
import com.quochuy.musicapp.enums.CommonStatus;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {
    @Query("""
            select s from Song s
            where (:status is null or s.status = :status)
              and (:artistId is null or s.artist.id = :artistId)
              and (:albumId is null or s.album.id = :albumId)
              and (:genreId is null or s.genre.id = :genreId)
              and (:keyword is null or lower(s.title) like lower(concat('%', :keyword, '%'))
                   or lower(s.artist.name) like lower(concat('%', :keyword, '%'))
                   or lower(coalesce(s.album.title, '')) like lower(concat('%', :keyword, '%')))
            """)
    Page<Song> search(@Param("status") CommonStatus status,
                      @Param("artistId") Long artistId,
                      @Param("albumId") Long albumId,
                      @Param("genreId") Long genreId,
                      @Param("keyword") String keyword,
                      Pageable pageable);

    Optional<Song> findByIdAndStatus(Long id, CommonStatus status);
    Page<Song> findByArtistIdAndStatus(Long artistId, CommonStatus status, Pageable pageable);
    Page<Song> findByAlbumIdAndStatus(Long albumId, CommonStatus status, Pageable pageable);
    Page<Song> findByGenreIdAndStatus(Long genreId, CommonStatus status, Pageable pageable);
    Optional<Song> findFirstByOrderByPlayCountDesc();
}
