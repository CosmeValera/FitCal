package com.fitcal.api.model;

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
public class Day {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Un dia tiene un UserData
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userdata_id")
    UserData userData;


    @Column(nullable = false)
    private LocalDate date;

    // Un dia puede tener muchos FoodInstances
    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FoodInstance> foodInstances = new ArrayList<>();

}
