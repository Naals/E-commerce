package com.project.backend.ecommerce.repositories;

import com.project.backend.ecommerce.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(RoleName roleName);
}
