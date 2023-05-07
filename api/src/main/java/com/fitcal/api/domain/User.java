package com.fitcal.api.domain;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long user_id;
    @OneToOne(mappedBy = "user")
    private UserData userData;
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String password;

    public User() {
    }

    public User(Long user_id, UserData userData, String username, String email, String password) {
        this.user_id = user_id;
        this.userData = userData;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public UserData getUserData() {
        return userData;
    }

    public void setUserData(UserData userData) {
        this.userData = userData;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
