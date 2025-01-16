package com.project.backend.ecommerce.model;


import jakarta.persistence.*;

import jakarta.validation.constraints.NotNull;


import java.util.ArrayList;
import java.util.*;


@Table(name="users")
@Entity
public class User {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name="name")
    private String name;

    @NotNull
    @Column(name="username")
    private String username;

    @Column(name="phone_number")
    private String phoneNumber;

    @NotNull
    @Column(name="password")
    private String password;

    @Column(name="address")
    private String address;

    @Column(name="email")
    private String email;


    @ManyToMany(mappedBy = "usersFavorite")
    private List<Product> productsFavorite = new ArrayList<>();

    @ManyToMany(mappedBy = "usersBag")
    private List<Product> productsBag = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    private Card card;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
                joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();


    public User(String name, String username, String email, String password) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public User() {

    }


    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getPhoneNumber() {
        return phoneNumber;
    }
    public String getPassword() {
        return password;
    }
    public String getAddress() {
        return address;
    }
    public String getEmail() {
        return email;
    }
    public Card getCard() {
        return card;
    }
    public Set<Role> getRoles() {
        return roles;
    }
    public @NotNull  String getUsername() {
        return username;
    }
    public List<Product> getProductsBag() {
        return productsBag;
    }
    public List<Product> getProductsFavorite() {
        return productsFavorite;
    }


    public void setProductsFavorite(List<Product> productsFavorite) {
        this.productsFavorite = productsFavorite;
    }
    public void setProductsBag(List<Product> productsBag) {
        this.productsBag = productsBag;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setAddress(String address) {
        this.address = address;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setCard(Card card) {
        this.card = card;
    }
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    public void setUsername(  @NotNull  String username) {
        this.username = username;
    }

}
