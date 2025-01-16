package com.project.backend.ecommerce.model;

import jakarta.persistence.*;


@Table(name="cards")
@Entity
public class Card {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="card_number")
    private String cardNumber;

    @Column(name="password")
    private String password;

    @Column(name="expiration_date")
    private String expirationDate;

    @OneToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;

    public Long getId() {
        return id;
    }
    public String getCardNumber() {
        return cardNumber;
    }
    public String getPassword() {
        return password;
    }
    public String getExpirationDate() {
        return expirationDate;
    }
    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }
    public void setUser(User user) {
        this.user = user;
    }
}
