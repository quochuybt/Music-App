package com.quochuy.musicapp.config;

import com.quochuy.musicapp.entity.*;
import com.quochuy.musicapp.enums.*;
import com.quochuy.musicapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ArtistRepository artistRepository;
    private final GenreRepository genreRepository;
    private final AlbumRepository albumRepository;
    private final SongRepository songRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        userRepository.save(User.builder().fullName("Quoc Huy").email("quochuy@gmail.com")
                .password(passwordEncoder.encode("huyle123")).role(Role.ADMIN).status(UserStatus.ACTIVE).build());
        userRepository.save(User.builder().fullName("User Demo").email("user@gmail.com")
                .password(passwordEncoder.encode("123456")).role(Role.USER).status(UserStatus.ACTIVE).build());
        userRepository.save(User.builder().fullName("Listener Demo").email("listener@gmail.com")
                .password(passwordEncoder.encode("123456")).role(Role.USER).status(UserStatus.ACTIVE).build());

        List<Artist> artists = artistRepository.saveAll(List.of(
                Artist.builder().name("Hoang Dung").imageUrl(img(1)).bio("Vietnamese pop artist").status(CommonStatus.ACTIVE).build(),
                Artist.builder().name("Son Tung M-TP").imageUrl(img(2)).bio("Vietnamese singer songwriter").status(CommonStatus.ACTIVE).build(),
                Artist.builder().name("ERIK").imageUrl(img(3)).bio("V-pop vocalist").status(CommonStatus.ACTIVE).build(),
                Artist.builder().name("Hoa Minzy").imageUrl(img(4)).bio("Vietnamese vocalist").status(CommonStatus.ACTIVE).build(),
                Artist.builder().name("My Tam").imageUrl(img(5)).bio("Vietnamese pop icon").status(CommonStatus.ACTIVE).build()
        ));
        List<Genre> genres = genreRepository.saveAll(List.of(
                Genre.builder().name("Pop").description("Modern Vietnamese pop").status(CommonStatus.ACTIVE).build(),
                Genre.builder().name("Ballad").description("Emotional ballads").status(CommonStatus.ACTIVE).build(),
                Genre.builder().name("R&B").description("Vietnamese R&B").status(CommonStatus.ACTIVE).build(),
                Genre.builder().name("Indie").description("Indie and acoustic").status(CommonStatus.ACTIVE).build(),
                Genre.builder().name("Dance").description("Upbeat V-pop").status(CommonStatus.ACTIVE).build()
        ));
        List<Album> albums = albumRepository.saveAll(List.of(
                album("25", artists.get(0), 2020),
                album("Sky Tour", artists.get(1), 2021),
                album("Em Khong Sai", artists.get(2), 2020),
                album("Thi Mau", artists.get(3), 2023),
                album("Tam 9", artists.get(4), 2017)
        ));

        String[] titles = {
                "Nang Tho", "Chay Ve Khoc Voi Anh", "Co Chac Yeu La Day", "Hen Yeu", "Ngay Mai Nguoi Ta Lay Chong",
                "Mot Buoc Yeu Van Dam Dau", "Em Khong Sai Chung Ta Sai", "Muon Roi Ma Sao Con", "Nguoi Hay Quen Em Di", "Dau Chi Rieng Em",
                "Thang Dien", "Sai Gon Dau Long Qua", "Mat Troi Cua Em", "Anh Dech Can Gi Nhieu Ngoai Em", "Bong Phu Hoa",
                "Noi Nay Co Anh", "Gieo Que", "De Mi Noi Cho Ma Nghe", "Vi Me Anh Bat Chia Tay", "Neu Luc Do"
        };
        for (int i = 0; i < titles.length; i++) {
            songRepository.save(Song.builder()
                    .title(titles[i]).artist(artists.get(i % artists.size())).album(albums.get(i % albums.size()))
                    .genre(genres.get(i % genres.size())).imageUrl(img(i + 10)).audioUrl("https://example.com/audio/song-" + (i + 1) + ".mp3")
                    .duration(String.format("0%d:%02d", 3 + (i % 3), 10 + i)).description("Demo Vietnamese music track")
                    .status(CommonStatus.ACTIVE).playCount((long) (i * 7)).build());
        }
    }

    private Album album(String title, Artist artist, Integer year) {
        return Album.builder().title(title).artist(artist).releaseYear(year).imageUrl(img(year)).description("Demo album").status(CommonStatus.ACTIVE).build();
    }

    private String img(int seed) {
        return "https://picsum.photos/seed/vietmusic" + seed + "/600/600";
    }
}
