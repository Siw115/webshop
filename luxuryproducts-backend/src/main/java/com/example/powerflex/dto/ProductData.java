package com.example.powerflex.dto;

import java.util.List;

public class ProductData {
    private String name;
    private String description;
    private String category;
    private String imageUrl;
    private List<VariantData> variants;

    // Constructors
    public ProductData() {
    }

    public ProductData(String name, String description, String category, String imageUrl, List<VariantData> variants) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
        this.variants = variants;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<VariantData> getVariants() {
        return variants;
    }

    public void setVariants(List<VariantData> variants) {
        this.variants = variants;
    }
}
