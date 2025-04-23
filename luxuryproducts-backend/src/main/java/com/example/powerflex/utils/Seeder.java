package com.example.powerflex.utils;

import com.example.powerflex.dao.OrderLineRepository;
import com.example.powerflex.dao.CustomOrderRepository;
import com.example.powerflex.dao.ProductDAO;
import com.example.powerflex.dao.UserRepository;
import com.example.powerflex.dto.ProductData;
import com.example.powerflex.models.*;
import com.example.powerflex.services.CategoryService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Component
public class Seeder {
    private final ProductDAO productDAO;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper; // Ensure ObjectMapper is injected or instantiated
    private CategoryService categoryService;


    @Autowired
    public Seeder(ProductDAO productDAO, UserRepository userRepository, ObjectMapper objectMapper, CategoryService categoryService) {
        this.productDAO = productDAO;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
        this.categoryService = categoryService;
    }

    @EventListener
    public void seed(ContextRefreshedEvent event) {
        try {
            List<ProductData> products = loadProductData();
            products.forEach(this::createProductFromData);
            seedUser();
        } catch (Exception e) {
            // Log or handle the exception appropriately
            e.printStackTrace();
        }
    }

    private List<ProductData> loadProductData() throws Exception {
        InputStream inputStream = new ClassPathResource("seed-data-products.json").getInputStream();
        return objectMapper.readValue(inputStream, new TypeReference<List<ProductData>>(){});
    }

    private void createProductFromData(ProductData productData) {
        // Use the category service to find or create the category by name
        Category category = categoryService.findOrCreateCategoryByName(productData.getCategory());

        // Create the product with the found or newly created category
        Product product = new Product(productData.getName(), productData.getDescription(), category, productData.getImageUrl());

        // Process variants
        productData.getVariants().forEach(variantData -> {
            Variant variant = new Variant(variantData.getColor(), variantData.getSize(), variantData.getAdditionalPrice(), variantData.getStock());
            product.addVariant(variant);
        });

        // Save the product
        productDAO.createProduct(product);
    }

    private void seedUser() {
        CustomUser customUser = new CustomUser("bob@bobsluxuryenterprise.com", new BCryptPasswordEncoder().encode("IreallyL0vePupp1es!"), Arrays.asList("ROLE_USER", "ROLE_ADMIN"));
        CustomUser customUser1 = new CustomUser("test@account.com", new BCryptPasswordEncoder().encode("TestLangGenoegWachtwoord1!"), Arrays.asList("ROLE_USER"));
        userRepository.save(customUser);
        userRepository.save(customUser1);
    }
}
