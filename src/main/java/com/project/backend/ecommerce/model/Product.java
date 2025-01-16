package com.project.backend.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import org.hibernate.annotations.Cascade;

import java.util.ArrayList;
import java.util.List;


@Table(name="product")
@Entity
public class Product {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="description")
    private String description;

    @Column(name="discount")
    private Double discount;

    @Column(name="in_stock")
    private Boolean inStock;

    @Column(name="quantity")
    private Integer quantity;

    @Column(name="price")
    private Integer price;

    @ManyToOne()
    @JoinColumn(name="category_id", referencedColumnName = "id")
    @Cascade(org.hibernate.annotations.CascadeType.SAVE_UPDATE)
    private Category category;

    @JsonIgnore
    @ManyToMany()
    @JoinTable(
            name="Bag",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> usersBag = new ArrayList<>();

    @JsonIgnore
    @ManyToMany()
    @JoinTable(
            name="Favorites",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<User> usersFavorite = new ArrayList<>();


    @OneToMany(mappedBy = "product")
    @Cascade(org.hibernate.annotations.CascadeType.DELETE_ORPHAN)
    private List<Images> imageList = new ArrayList<>();

    public Long getId() {
        return id;
    }
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
    public Integer getPrice() {
        return price;
    }
    public Category getCategory() {
        return category;
    }
    public List<User> getUsersBag() {
        return usersBag;
    }
    public List<User> getUsersFavorite() {
        return usersFavorite;
    }
    public List<Images> getImageList() {
        return imageList;
    }


    public void setImageList(List<Images> imageList) {
        this.imageList = imageList;
    }
    public void setId(Long id) {
        this.id = id;
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
    public void setPrice(Integer price) {
        this.price = price;
    }
    public void setCategory(Category category) {
        this.category = category;
    }
    public void setUsersBag(List<User> usersBag) {
        this.usersBag = usersBag;
    }
    public void setUsersFavorite(List<User> usersFavorite) {
        this.usersFavorite = usersFavorite;
    }
}
