package com.fitcal.api.model;

import com.fitcal.api.enums.ActivityLevel;
import com.fitcal.api.enums.Goals;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    // Login
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(length = 40, nullable = false)
    private String email;

    @Lob
    @Column(nullable = false, length = 1000)
    private String googleId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String photoUrl;

    // Informacion

    @Column(columnDefinition = "double default 50.0")
    private double weight;

    @Column
    private int height;

    @Column
    private int calories;

    @Column
    private char gender;

    @Column
    private LocalDate birth_date;

    @Column
    private Goals goal;

    @Column
    private ActivityLevel activityLevel;

    // Un UserData tiene muchos dias
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Day> days = new ArrayList<>();



    public User(Long id, String email, String googleId, String name, String photoUrl) {
        this.id = id;
        this.email = email;
        this.googleId = googleId;
        this.name = name;
        this.photoUrl = photoUrl;
    }

}
