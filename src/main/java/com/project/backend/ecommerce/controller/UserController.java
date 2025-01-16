package com.project.backend.ecommerce.controller;


import com.project.backend.ecommerce.model.*;
import com.project.backend.ecommerce.paylod.response.MessageResponse;
import com.project.backend.ecommerce.repositories.ProductRepository;
import com.project.backend.ecommerce.repositories.UserRepository;
import com.project.backend.ecommerce.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;


@RestController
@RequestMapping("/users")
public class UserController {


    private UserRepository userRepository;
    private ProductRepository productRepository;

    private JwtProvider jwtProvider;

    @Autowired
    public UserController(
            JwtProvider jwtProvider,
            UserRepository userRepository,
            ProductRepository productRepository
    ) {


        this.jwtProvider = jwtProvider;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @PostMapping("/cart")
    public ResponseEntity<?> addToCart(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Long> requestBody
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        Long productId = requestBody.get("productId");
        if (productId == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Product ID is required"));
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Error: Product not found!"));

        user.getProductsBag().add(product);
        product.getUsersBag().add(user);
        userRepository.save(user);
        productRepository.save(product);

        return ResponseEntity.ok(new MessageResponse("Product added to cart successfully!"));
    }


    @PostMapping("/favorites")
    public ResponseEntity<?> addToFavorites(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Long> requestBody
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        Long productId = requestBody.get("productId");
        if (productId == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Product ID is required"));
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Error: Product not found!"));

        user.getProductsFavorite().add(product);
        product.getUsersFavorite().add(user);
        userRepository.save(user);
        productRepository.save(product);

        return ResponseEntity.ok(new MessageResponse("Product added to favorites successfully!"));
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getCart(
            @RequestHeader("Authorization") String token
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        return ResponseEntity.ok(user.getProductsBag());
    }

    @GetMapping("/favorites")
    public ResponseEntity<?> getFavorites(
            @RequestHeader("Authorization") String token
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        return ResponseEntity.ok(user.getProductsFavorite());
    }


    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(
    ){
        return ResponseEntity.ok(productRepository.findAllWithImagesOrderedByName());
    }

    @GetMapping("/products/{gender}")
    public ResponseEntity<?> getAllProductsByGender(@PathVariable("gender") String gender){
        try {
            Gender genderEnum = Gender.valueOf(gender.toUpperCase());
            return ResponseEntity.ok(productRepository.findByCategory_GenderOrderByCategory_Name(genderEnum));
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid gender value");
        }
    }

    @PatchMapping("/update/username")
    public ResponseEntity<?> updateUsername(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> requestBody
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        String newUsername = requestBody.get("username");
        if (newUsername == null || newUsername.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username cannot be empty"));
        }

        user.setUsername(newUsername);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Username updated successfully"));
    }

    @PatchMapping("/update/password")
    public ResponseEntity<?> updatePassword(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> requestBody
    ) {
        String jwt = token.substring(7);
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        String newPassword = requestBody.get("password");
        if (newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Password cannot be empty"));
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Password updated successfully"));
    }

    @PatchMapping("/update/address")
    public ResponseEntity<?> updateAddress(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> requestBody
    ) {
        String jwt = token.substring(7);
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        String newAddress = requestBody.get("address");
        if (newAddress == null || newAddress.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Address cannot be empty"));
        }

        user.setAddress(newAddress);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Address updated successfully"));
    }

    @PatchMapping("/update/phone")
    public ResponseEntity<?> updatePhoneNumber(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> requestBody
    ) {
        String jwt = token.substring(7);
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        String newPhoneNumber = requestBody.get("phone_number");
        if (newPhoneNumber == null || newPhoneNumber.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Phone number cannot be empty"));
        }

        user.setPhoneNumber(newPhoneNumber);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Phone number updated successfully"));
    }

    @DeleteMapping("/delete/cart")
    public ResponseEntity<?> removeFromCart(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Long> requestBody
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        Long productId = requestBody.get("productId");
        if (productId == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Product ID is required"));
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Error: Product not found!"));

        // Remove the product from the user's cart
        if (user.getProductsBag().remove(product)) {
            product.getUsersBag().remove(user);
            userRepository.save(user);
            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Product removed from cart successfully!"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Product not found in cart!"));
        }
    }

    @DeleteMapping("delete/favorites")
    public ResponseEntity<?> removeFromFavorites(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, Long> requestBody
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        Long productId = requestBody.get("productId");
        if (productId == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Product ID is required"));
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Error: Product not found!"));

        // Remove the product from the user's favorites
        if (user.getProductsFavorite().remove(product)) {
            product.getUsersFavorite().remove(user);
            userRepository.save(user);
            productRepository.save(product);
            return ResponseEntity.ok(new MessageResponse("Product removed from favorites successfully!"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Product not found in favorites!"));
        }
    }

    @PostMapping("/replaceCard")
    public ResponseEntity<?> replaceCard(
            @RequestHeader("Authorization") String token,
            @RequestBody Map<String, String> requestBody
    ) {
        String jwt = token.substring(7); // Strip "Bearer " prefix
        String username = jwtProvider.getUserNameFromJwtToken(jwt);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Error: User not found!"));

        Long oldCardId = Long.parseLong(requestBody.get("oldCardId"));
        String newCardNumber = requestBody.get("newCardNumber");
        String newPassword = requestBody.get("newPassword");
        String newExpirationDate = requestBody.get("newExpirationDate");

        Card oldCard = user.getCard(); // Assuming User has a `Card` field mapped
        if (oldCard == null || !oldCard.getId().equals(oldCardId)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Old card does not exist or does not match!"));
        }

        // Create and set new card details
        Card newCard = new Card();
        newCard.setCardNumber(newCardNumber);
        newCard.setPassword(newPassword);
        newCard.setExpirationDate(newExpirationDate);
        newCard.setUser(user);

        user.setCard(newCard);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("Card replaced successfully!"));
    }




}
