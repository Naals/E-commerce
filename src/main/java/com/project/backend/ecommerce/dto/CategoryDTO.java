package com.project.backend.ecommerce.dto;

import com.project.backend.ecommerce.model.Product;

import java.util.ArrayList;
import java.util.List;

public class CategoryDTO {


    private String gender;

    private String name;

    List<Product> products = new ArrayList<>();


    public String getGender() {
        return gender;
    }
    public String getName() {
        return name;
    }
    public List<Product> getProducts() {
        return products;
    }


    public void setGender(String gender) {
        this.gender = gender;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setProducts(List<Product> products) {
        this.products = products;
    }
}
