package com.quochuy.musicapp.service;

import com.quochuy.musicapp.dto.response.UploadResponse;
import com.quochuy.musicapp.exception.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FileStorageServiceTest {
    @TempDir
    Path tempDir;

    @Test
    void storesValidPngImage() {
        FileStorageService service = service();
        byte[] png = new byte[] {
                (byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
                0, 0, 0, 0
        };
        MockMultipartFile file = new MockMultipartFile("file", "cover.png", "image/png", png);

        UploadResponse response = service.store(file, "image");

        assertThat(response.getUrl()).startsWith("/uploads/image/").endsWith(".png");
        assertThat(Files.exists(tempDir.resolve("image").resolve(response.getFileName()))).isTrue();
    }

    @Test
    void rejectsImageWithInvalidSignature() {
        FileStorageService service = service();
        MockMultipartFile file = new MockMultipartFile("file", "cover.png", "image/png", "not-an-image".getBytes());

        assertThatThrownBy(() -> service.store(file, "image"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("File content khong hop le");
    }

    @Test
    void rejectsOversizedAudioFile() {
        FileStorageService service = service();
        byte[] mp3 = new byte[] {0x49, 0x44, 0x33, 0, 0, 0};
        MockMultipartFile file = new MockMultipartFile("file", "song.mp3", "audio/mpeg", mp3);

        ReflectionTestUtils.setField(service, "maxAudioSize", 2L);

        assertThatThrownBy(() -> service.store(file, "audio"))
                .isInstanceOf(BadRequestException.class)
                .hasMessage("File is too large");
    }

    private FileStorageService service() {
        FileStorageService service = new FileStorageService();
        ReflectionTestUtils.setField(service, "uploadDir", tempDir.toString());
        ReflectionTestUtils.setField(service, "maxAudioSize", 20_971_520L);
        ReflectionTestUtils.setField(service, "maxImageSize", 5_242_880L);
        return service;
    }
}
