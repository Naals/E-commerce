package com.project.backend.ecommerce.dto;

import com.project.backend.ecommerce.model.User;

public class CardDTO {

    private String cardNumber;

    private String password;

    private String expirationDate;

    private User user;


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
