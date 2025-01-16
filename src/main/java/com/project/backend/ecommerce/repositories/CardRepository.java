package com.project.backend.ecommerce.repositories;

import com.project.backend.ecommerce.model.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
