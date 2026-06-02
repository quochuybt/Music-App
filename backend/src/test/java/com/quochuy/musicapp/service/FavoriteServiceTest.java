package com.quochuy.musicapp.service;

import com.quochuy.musicapp.entity.*;
import com.quochuy.musicapp.enums.CommonStatus;
import com.quochuy.musicapp.enums.Role;
import com.quochuy.musicapp.enums.UserStatus;
import com.quochuy.musicapp.repository.FavoriteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FavoriteServiceTest {
    @Mock
    private FavoriteRepository favoriteRepository;
    @Mock
    private SongService songService;
    @Mock
    private CurrentUserService currentUserService;
    @InjectMocks
    private FavoriteService favoriteService;

    @Test
    void addFavoriteUsesOnlyActiveSongs() {
        User user = User.builder().id(7L).fullName("User").email("user@example.com").role(Role.USER).status(UserStatus.ACTIVE).build();
        Artist artist = Artist.builder().id(1L).name("Artist").status(CommonStatus.ACTIVE).build();
        Genre genre = Genre.builder().id(2L).name("Pop").status(CommonStatus.ACTIVE).build();
        Song song = Song.builder()
                .id(3L)
                .title("Song")
                .artist(artist)
                .genre(genre)
                .status(CommonStatus.ACTIVE)
                .playCount(0L)
                .build();

        when(currentUserService.get()).thenReturn(user);
        when(favoriteRepository.existsByUserIdAndSongId(7L, 3L)).thenReturn(false);
        when(songService.getActiveEntity(3L)).thenReturn(song);

        favoriteService.add(3L);

        verify(songService).getActiveEntity(3L);
        verify(songService, never()).getEntity(anyLong());
        ArgumentCaptor<Favorite> captor = ArgumentCaptor.forClass(Favorite.class);
        verify(favoriteRepository).save(captor.capture());
        assertThat(captor.getValue().getId().getUserId()).isEqualTo(7L);
        assertThat(captor.getValue().getId().getSongId()).isEqualTo(3L);
    }
}
