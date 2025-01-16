package com.project.backend.ecommerce.dto;

import com.project.backend.ecommerce.model.Category;


public class ProductDTO {


    private String name;

    private String description;

    private Double discount;

    private Boolean inStock;

    private Integer quantity;

    private Double price;

    private Category category;

    private Double priceWithDiscount;

    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public Double getDiscount() {
        return discount;
    }
    public Boolean getInStock() {
        return inStock;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public Double getPrice() {
        return price;
    }
    public Category getCategory() {
        return category;
    }
    public Double getPriceWithDiscount() {
        return price-(discount*price)/100;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setDiscount(Double discount) {
        this.discount = discount;
    }
    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public void setPriceWithDiscount(Double priceWithDiscount) {
        this.priceWithDiscount = priceWithDiscount;
    }
}
