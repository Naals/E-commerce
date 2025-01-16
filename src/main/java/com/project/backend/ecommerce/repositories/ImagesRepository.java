package com.project.backend.ecommerce.repositories;

import com.project.backend.ecommerce.model.Images;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagesRepository extends JpaRepository<Images, Long> {
}
