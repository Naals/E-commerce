package com.project.backend.ecommerce.dto;





public class UserDTO {

    private String name;

    private String username;

    private String phoneNumber;

    private String password;

    private String address;

    private String email;

    private String status;


    public String getName() { return name; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getPassword() { return password; }
    public String getAddress() { return address; }
    public String getEmail() { return email; }
    public String getStatus() { return status; }
    public String getUsername() {
        return username;
    }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setPassword(String password) { this.password = password; }
    public void setAddress(String address) { this.address = address; }
    public void setEmail(String email) { this.email = email; }
    public void setStatus(String status) { this.status = status; }
    public void setUsername(String username) {
        this.username = username;
    }
}
