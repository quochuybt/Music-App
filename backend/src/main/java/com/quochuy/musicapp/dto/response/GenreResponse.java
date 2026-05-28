package com.quochuy.musicapp.dto.response;

import com.quochuy.musicapp.enums.CommonStatus;
import lombok.*;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class GenreResponse {
    private Long id;
    private String name;
    private String description;
    private CommonStatus status;
}
