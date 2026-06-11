package com.quochuy.musicapp.repository;

import com.quochuy.musicapp.entity.Song;
import com.quochuy.musicapp.dto.response.SongResponse;
import com.quochuy.musicapp.enums.CommonStatus;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {
    @Query("""
            select s from Song s
            left join s.album a
            where (:status is null or s.status = :status)
              and (:artistId is null or s.artist.id = :artistId)
              and (:albumId is null or a.id = :albumId)
              and (:genreId is null or s.genre.id = :genreId)
              and (:keyword is null or lower(s.title) like lower(concat('%', :keyword, '%'))
                   or lower(s.artist.name) like lower(concat('%', :keyword, '%'))
                   or lower(coalesce(a.title, '')) like lower(concat('%', :keyword, '%')))
            """)
    Page<Song> search(@Param("status") CommonStatus status,
                      @Param("artistId") Long artistId,
                      @Param("albumId") Long albumId,
                      @Param("genreId") Long genreId,
                      @Param("keyword") String keyword,
                      Pageable pageable);

    @Query(value = """
            select new com.quochuy.musicapp.dto.response.SongResponse(
                s.id, s.title, s.imageUrl, s.audioUrl, s.duration, s.description,
                ar.id, ar.name, a.id, a.title, g.id, g.name, s.status, s.playCount
            )
            from Song s
            join s.artist ar
            join s.genre g
            left join s.album a
            where (:status is null or s.status = :status)
              and (:artistId is null or ar.id = :artistId)
              and (:albumId is null or a.id = :albumId)
              and (:genreId is null or g.id = :genreId)
              and (:keyword is null or lower(s.title) like lower(concat('%', :keyword, '%'))
                   or lower(ar.name) like lower(concat('%', :keyword, '%'))
                   or lower(coalesce(a.title, '')) like lower(concat('%', :keyword, '%')))
            """,
            countQuery = """
            select count(s)
            from Song s
            join s.artist ar
            join s.genre g
            left join s.album a
            where (:status is null or s.status = :status)
              and (:artistId is null or ar.id = :artistId)
              and (:albumId is null or a.id = :albumId)
              and (:genreId is null or g.id = :genreId)
              and (:keyword is null or lower(s.title) like lower(concat('%', :keyword, '%'))
                   or lower(ar.name) like lower(concat('%', :keyword, '%'))
                   or lower(coalesce(a.title, '')) like lower(concat('%', :keyword, '%')))
            """)
    Page<SongResponse> searchResponses(@Param("status") CommonStatus status,
                                       @Param("artistId") Long artistId,
                                       @Param("albumId") Long albumId,
                                       @Param("genreId") Long genreId,
                                       @Param("keyword") String keyword,
                                       Pageable pageable);

    @Query("""
            select new com.quochuy.musicapp.dto.response.SongResponse(
                s.id, s.title, s.imageUrl, s.audioUrl, s.duration, s.description,
                ar.id, ar.name, a.id, a.title, g.id, g.name, s.status, s.playCount
            )
            from Song s
            join s.artist ar
            join s.genre g
            left join s.album a
            where s.id = :id and s.status = :status
            """)
    Optional<SongResponse> findResponseByIdAndStatus(@Param("id") Long id, @Param("status") CommonStatus status);

    Optional<Song> findByIdAndStatus(Long id, CommonStatus status);
    Page<Song> findByArtistIdAndStatus(Long artistId, CommonStatus status, Pageable pageable);
    Page<Song> findByAlbumIdAndStatus(Long albumId, CommonStatus status, Pageable pageable);
    Page<Song> findByGenreIdAndStatus(Long genreId, CommonStatus status, Pageable pageable);
    Optional<Song> findFirstByOrderByPlayCountDesc();
}
