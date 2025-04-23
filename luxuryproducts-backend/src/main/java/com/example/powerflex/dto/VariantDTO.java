package com.example.powerflex.dto;

import com.example.powerflex.models.Product;

public class VariantDTO {
    private Long id;
    private String color;
    private String size;
    private double additionalPrice;
    private int stock;
    private Long productId;

    // Constructor
    public VariantDTO(String color, String size, double additionalPrice, int stock, Long productId) {
        this.color = color;
        this.size = size;
        this.additionalPrice = additionalPrice;
        this.stock = stock;
        this.productId = productId;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public double getAdditionalPrice() {
        return additionalPrice;
    }

    public void setAdditionalPrice(double additionalPrice) {
        this.additionalPrice = additionalPrice;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

}
