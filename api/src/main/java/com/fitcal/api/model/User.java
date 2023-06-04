package com.fitcal.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(mappedBy = "user")
    private UserData userData; // Relación 1 a 1 con UserData

    @Column(length = 30, nullable = false)
    private String username;

    @Column(length = 40, nullable = false)
    private String email;

    @Column(length = 40, nullable = false)
    private String password;

    @Column(nullable = false)
    private String googleId;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String pictureUrl;

    public User(String username, String email, String password, String googleId, String fullName, String pictureUrl) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.googleId = googleId;
        this.fullName = fullName;
        this.pictureUrl = pictureUrl;
    }
}
