package com.project.backend.ecommerce.repositories;

import com.project.backend.ecommerce.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(@NotBlank @Size(max = 50) @Email String email);

    boolean existsByUsername(@NotBlank @Size(min = 3, max = 20) String username);

    Optional<User> findByUsername(String username);
}
