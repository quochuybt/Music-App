package com.quochuy.musicapp.dto.response;

import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class UploadResponse {
    private String url;
    private String fileName;
    private String contentType;
    private long size;
}
