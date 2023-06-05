package com.fitcal.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GoogleAuthDTO {

    private Long id;
    private String idToken;
    private String name;
    private String email;
    private String photoUrl;


}
