package com.project.backend.ecommerce.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NaturalId;



@Data
@RequiredArgsConstructor
@Entity
@Table(name = "Roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NonNull
    @NaturalId
    @Column(length = 60)
    private RoleName name;

    public Role() {
    }


    public @NonNull RoleName getName() {
        return name;
    }

    public void setName(@NonNull RoleName name) {
        this.name = name;
    }
}
