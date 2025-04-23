package com.example.powerflex.dao;

import com.example.powerflex.dto.VariantDTO;
import com.example.powerflex.models.Product;
import com.example.powerflex.models.Variant;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Component
public class VariantDAO {
    private final VariantRepository variantRepository;
    private final ProductRepository productRepository;

    public VariantDAO(VariantRepository variantRepository, ProductRepository productRepository) {
        this.variantRepository = variantRepository;
        this.productRepository = productRepository;
    }

    public List<Variant> getAllVariants() {
        return variantRepository.findAll();
    }

    public Variant getVariantById(long id) {
        return variantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found"));
    }

    @Transactional
    public void createVariant(VariantDTO variantDTO) {
        Variant variant = new Variant();
        variant.setColor(variantDTO.getColor());
        variant.setSize(variantDTO.getSize());
        variant.setAdditionalPrice(variantDTO.getAdditionalPrice());
        variant.setStock(variantDTO.getStock());

        // Fetch the Product entity by productId
        Product product = productRepository.findById(variantDTO.getProductId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
        variant.setProduct(product);

        this.variantRepository.save(variant);
    }

    @Transactional
    public void updateVariant(Long id, VariantDTO updatedVariant) {
        Variant variant = getVariantById(id);
        variant.setColor(updatedVariant.getColor());
        variant.setSize(updatedVariant.getSize());
        variant.setAdditionalPrice(updatedVariant.getAdditionalPrice());
        variant.setStock(updatedVariant.getStock());

        // Fetch the Product entity by productId
        Product product = productRepository.findById(updatedVariant.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        variant.setProduct(product);

        variantRepository.save(variant);
    }

    public void deleteVariant(Long id) {
        if (!variantRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant not found");
        }
        variantRepository.deleteById(id);
    }
}
