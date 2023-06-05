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

    @Column(length = 40, nullable = false)
    private String email;

    @Lob
    @Column(nullable = false, length = 1000)
    private String googleId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String photoUrl;
}
