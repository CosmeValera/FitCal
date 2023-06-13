package com.fitcal.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeightDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Un WeightDay tiene un UserData
    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;


    @Column(nullable = false)
    private LocalDate date;

    @Column(columnDefinition = "double default 50.0")
    private double weight;

}
