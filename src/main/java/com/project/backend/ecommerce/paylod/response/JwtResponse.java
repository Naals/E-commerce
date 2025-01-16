package com.project.backend.ecommerce.paylod.response;


import lombok.*;

import java.util.List;


public class JwtResponse {

    @NonNull
    private String token;

    private String type = "Bearer";

    @NonNull
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private String username;

    @NonNull
    private String email;

    @NonNull
    private List<String> roles;

    public JwtResponse( String token, String type,
                        Long id,  String name,
                        String username,  String email,
                        List<String> roles) {
        this.token = token;
        this.type = type;
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }

    public JwtResponse(String jwt, Long id, String name, String username, String email,  List<String> roles) {
        this.token = jwt;
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
        this.roles = roles;
    }

    public JwtResponse() {
    }

    public @NonNull String getToken() {
        return token;
    }
    public @NonNull List<String> getRoles() {
        return roles;
    }
    public @NonNull String getEmail() {
        return email;
    }
    public @NonNull String getUsername() {
        return username;
    }
    public @NonNull String getName() {
        return name;
    }
    public @NonNull Long getId() {
        return id;
    }
    public String getType() {
        return type;
    }

    public void setToken(@NonNull String token) {
        this.token = token;
    }
    public void setRoles(@NonNull List<String> roles) {
        this.roles = roles;
    }
    public void setEmail(@NonNull String email) {
        this.email = email;
    }
    public void setUsername(@NonNull String username) {
        this.username = username;
    }
    public void setName(@NonNull String name) {
        this.name = name;
    }
    public void setId(@NonNull Long id) {
        this.id = id;
    }
    public void setType(String type) {
        this.type = type;
    }
}
