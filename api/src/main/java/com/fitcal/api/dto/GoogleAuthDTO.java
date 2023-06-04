package com.fitcal.api.dto;

import lombok.Data;

@Data
public class GoogleAuthDTO {

    private String token;
    private String idToken;
    private String name;

    public GoogleAuthDTO() {
    }
}
