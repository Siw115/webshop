package com.example.powerflex.dto;

import com.fasterxml.jackson.annotation.JsonAlias;

import java.util.List;

public class ProductDTO {
    public String name;
    public String description;
    public double price;

    @JsonAlias("category_id")
    public long categoryId;

    @JsonAlias("variants")
    public List<VariantDTO> variants;

    public String imageUrl;

    public ProductDTO(String name, String description, double price, long categoryId, List<VariantDTO> variants, String imageUrl) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.variants = variants;
        this.imageUrl = imageUrl;
    }

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

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public List<VariantDTO> getVariants() {
        return variants;
    }

    public void setVariants(List<VariantDTO> variants) {
        this.variants = variants;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
