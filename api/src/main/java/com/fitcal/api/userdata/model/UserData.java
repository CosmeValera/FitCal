package com.fitcal.api.userdata.model;

import com.fitcal.api.enums.ActivityLevel;
import com.fitcal.api.enums.Goals;
import com.fitcal.api.user.model.User;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class UserData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;
    @OneToOne
    @JoinColumn(name = "user_id") // Clave externa que se utiliza para vincular los registros de ambas tablas
    private User user;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surnames;
    @Column(nullable = false)
    private String image;
    @Column(nullable = false)
    private double weight;
    @Column(nullable = false)
    private int height;
    @Column(nullable = false)
    private char gender;
    @Column(nullable = false)
    private LocalDate birth_date;
    @Column(nullable = false)
    private Goals goal;
    @Column(nullable = false)
    private ActivityLevel activityLevel;

    public UserData() {
    }

    public UserData(Long user_id, User user, String name, String surnames, String image, double weight, int height, char gender, LocalDate birth_date, Goals goal, ActivityLevel activityLevel) {
        this.user_id = user_id;
        this.user = user;
        this.name = name;
        this.surnames = surnames;
        this.image = image;
        this.weight = weight;
        this.height = height;
        this.gender = gender;
        this.birth_date = birth_date;
        this.goal = goal;
        this.activityLevel = activityLevel;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public LocalDate getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(LocalDate birth_date) {
        this.birth_date = birth_date;
    }

    public Goals getGoal() {
        return goal;
    }

    public void setGoal(Goals goal) {
        this.goal = goal;
    }

    public ActivityLevel getActivityLevel() {
        return activityLevel;
    }

    public void setActivityLevel(ActivityLevel activityLevel) {
        this.activityLevel = activityLevel;
    }
}