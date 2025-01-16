package com.project.backend.ecommerce.repositories;

import com.project.backend.ecommerce.model.Gender;
import com.project.backend.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategory_GenderOrderByCategory_Name(Gender gender);

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.imageList ORDER BY p.name")
    List<Product> findAllWithImagesOrderedByName();


}
