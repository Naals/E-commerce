package com.project.backend.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.NaturalId;


import java.util.*;



@Table(name="categories")
@Entity
public class Category {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 60)
    @NotNull
    @NaturalId
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name="name")
    private String name;

    @Column(name = "release")
    private Boolean release;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    List<Product> products = new ArrayList<>();

    public Long getId() {
        return id;
    }
    public Gender getGender() {
        return gender;
    }
    public String getName() {
        return name;
    }
    public List<Product> getProducts() {
        return products;
    }
    public Boolean getRelease() {
        return release;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setGender(Gender gender) {
        this.gender = gender;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setProducts(List<Product> products) {
        this.products = products;
    }
    public void setRelease(Boolean release) {
        this.release = release;
    }
}
