package com.fitcal.api.user.model;


import com.fitcal.api.userdata.model.UserData;
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
    @Column(name = "user_id")
    private Long user_id;
    @OneToOne(mappedBy = "user")
    private UserData userData; // Relacion 1 a 1 con UserData
    @Column(length = 30, nullable = false)
    private String username;
    @Column(length = 40, nullable = false)
    private String email;
    @Column(length = 40, nullable = false)
    private String password;

}
