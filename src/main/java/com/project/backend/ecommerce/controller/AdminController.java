package com.project.backend.ecommerce.controller;

import com.project.backend.ecommerce.model.Gender;
import com.project.backend.ecommerce.model.Images;
import com.project.backend.ecommerce.model.Product;
import com.project.backend.ecommerce.model.Category;
import com.project.backend.ecommerce.repositories.CategoryRepository;
import com.project.backend.ecommerce.repositories.ImagesRepository;
import com.project.backend.ecommerce.repositories.ProductRepository;
import com.project.backend.ecommerce.repositories.UserRepository;
import com.project.backend.ecommerce.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin/products")
public class AdminController {

    private final ProductRepository productRepository;
    private final ImagesRepository imagesRepository;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final CategoryRepository categoryRepository;

    @Autowired
    public AdminController(ProductRepository productRepository, ImagesRepository imagesRepository, UserRepository userRepository, JwtProvider jwtProvider, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.imagesRepository = imagesRepository;
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.categoryRepository = categoryRepository;
    }

    private void validateAdmin(String token) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        var user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        System.out.println("Token: " + jwt);
        System.out.println("Username: " + username);
        System.out.println("Roles: " + user.getRoles());

    }


    // Create a new product with image links
    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Object> productData
    ) {
        validateAdmin(token);

        try {
            // Parse basic product fields
            Product product = new Product();
            product.setName((String) productData.get("name"));
            product.setDescription((String) productData.get("description"));
            product.setDiscount((Double) productData.get("discount"));
            product.setInStock((Boolean) productData.get("inStock"));
            product.setQuantity((Integer) productData.get("quantity"));
            product.setPrice((Integer) productData.get("price"));


            // Parse category
            Map<String, Object> categoryData = (Map<String, Object>) productData.get("category");
            if (categoryData != null) {
                Category category = new Category();
                category.setGender(Enum.valueOf(Gender.class, categoryData.get("gender").toString().toUpperCase()));
                category.setName((String) categoryData.get("name"));
                category.setRelease((Boolean) categoryData.get("release"));
                categoryRepository.save(category);
                product.setCategory(category);
            }

            // Save product
            Product savedProduct = productRepository.save(product);

            // Parse image list
            List<Map<String, Object>> imageListData = (List<Map<String, Object>>) productData.get("imageList");
            if (imageListData != null) {
                for (Map<String, Object> imageData : imageListData) {
                    String imageUrl = (String) imageData.get("image");
                    Images image = new Images();
                    image.setImage(imageUrl);
                    image.setProduct(savedProduct);
                    imagesRepository.save(image);
                }
            }

            // Return response with a success message
            return ResponseEntity.ok(Map.of(
                    "message", "Product created successfully",
                    "product", savedProduct
            ));
        } catch (Exception e) {
            // Handle unexpected errors
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Failed to create product",
                    "error", e.getMessage()
            ));
        }
    }



    // Update an existing product and image links
    @PatchMapping("/{id}")
    public ResponseEntity<?> updateProduct(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody Map<String, Object> productData
    ) {
        validateAdmin(token);

        try {
            // Find the existing product
            Optional<Product> existingProductOpt = productRepository.findById(id);
            if (existingProductOpt.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", "Product not found",
                        "productId", id
                ));
            }

            Product existingProduct = existingProductOpt.get();

            // Update product fields
            if (productData.get("name") != null) existingProduct.setName((String) productData.get("name"));
            if (productData.get("description") != null) existingProduct.setDescription((String) productData.get("description"));
            if (productData.get("discount") != null) existingProduct.setDiscount((Double) productData.get("discount"));
            if (productData.get("inStock") != null) existingProduct.setInStock((Boolean) productData.get("inStock"));
            if (productData.get("quantity") != null) existingProduct.setQuantity((Integer) productData.get("quantity"));
            if (productData.get("price") != null) existingProduct.setPrice((Integer) productData.get("price"));

            // Update category
            Map<String, Object> categoryData = (Map<String, Object>) productData.get("category");
            if (categoryData != null) {
                Category category = new Category();
                category.setGender(Enum.valueOf(Gender.class, categoryData.get("gender").toString().toUpperCase()));
                category.setName((String) categoryData.get("name"));
                category.setRelease((Boolean) categoryData.get("release"));

                // Save category if needed
                categoryRepository.save(category);
                existingProduct.setCategory(category);
            }

            // Update product in database
            Product updatedProduct = productRepository.save(existingProduct);

            // Update image list
            List<Map<String, Object>> imageListData = (List<Map<String, Object>>) productData.get("imageList");
            if (imageListData != null) {
                // Delete existing images for the product
                imagesRepository.deleteAll(existingProduct.getImageList());

                // Add new images
                for (Map<String, Object> imageData : imageListData) {
                    String imageUrl = (String) imageData.get("image");
                    Images image = new Images();
                    image.setImage(imageUrl);
                    image.setProduct(updatedProduct);
                    imagesRepository.save(image);
                }
            }

            // Return response with a success message
            return ResponseEntity.ok(Map.of(
                    "message", "Product updated successfully",
                    "product", updatedProduct
            ));
        } catch (Exception e) {
            // Handle unexpected errors
            return ResponseEntity.badRequest().body(Map.of(
                    "message", "Failed to update product",
                    "error", e.getMessage()
            ));
        }
    }


    // Delete a product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) {
        validateAdmin(token);

        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Product not found with ID: " + id);
        }

        productRepository.deleteById(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // Get all products
    @GetMapping
    public ResponseEntity<?> getAllProducts(
            @RequestHeader("Authorization") String token
    ) {
        validateAdmin(token);
        return ResponseEntity.ok(productRepository.findAll());
    }

    // Get a product by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id
    ) {
        validateAdmin(token);

        Optional<Product> productOpt = productRepository.findById(id);
        if (productOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Product not found with ID: " + id);
        }
        return ResponseEntity.ok(productOpt.get());
    }
}

