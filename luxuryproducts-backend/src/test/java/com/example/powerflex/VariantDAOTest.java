package com.example.powerflex;

import com.example.powerflex.dao.ProductRepository;
import com.example.powerflex.dao.VariantDAO;
import com.example.powerflex.dao.VariantRepository;
import com.example.powerflex.dto.VariantDTO;
import com.example.powerflex.models.Product;
import com.example.powerflex.models.Variant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class VariantDAOTest {

    @Mock
    private VariantRepository variantRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private VariantDAO variantDAO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllVariants() {
        // Arrange
        Variant variant1 = new Variant("Red", "M", 10.0, 100);
        Variant variant2 = new Variant("Blue", "L", 15.0, 200);
        List<Variant> variants = Arrays.asList(variant1, variant2);

        when(variantRepository.findAll()).thenReturn(variants);

        // Act
        List<Variant> result = variantDAO.getAllVariants();

        // Assert
        assertEquals(2, result.size());
        verify(variantRepository, times(1)).findAll();
    }

    @Test
    void getVariantById() {
        // Arrange
        Variant variant = new Variant("Red", "M", 10.0, 100);
        when(variantRepository.findById(1L)).thenReturn(Optional.of(variant));

        // Act
        Variant result = variantDAO.getVariantById(1L);

        // Assert
        assertEquals("Red", result.getColor());
        verify(variantRepository, times(1)).findById(1L);
    }

    @Test
    void getVariantById_NotFound() {
        // Arrange
        when(variantRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> variantDAO.getVariantById(1L));
        verify(variantRepository, times(1)).findById(1L);
    }

    @Test
    void createVariant() {
        // Arrange
        VariantDTO variantDTO = new VariantDTO("Red", "M", 10.0, 100, 1L);
        Product product = new Product();
        product.setId(1L);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(variantRepository.save(any(Variant.class))).thenReturn(new Variant());

        // Act
        variantDAO.createVariant(variantDTO);

        // Assert
        verify(productRepository, times(1)).findById(1L);
        verify(variantRepository, times(1)).save(any(Variant.class));
    }

    @Test
    void updateVariant() {
        // Arrange
        Variant variant = new Variant("Red", "M", 10.0, 100);
        variant.setId(1L);
        Product product = new Product();
        product.setId(1L);

        VariantDTO updatedVariantDTO = new VariantDTO("Blue", "L", 15.0, 200, 1L);

        when(variantRepository.findById(1L)).thenReturn(Optional.of(variant));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(variantRepository.save(any(Variant.class))).thenReturn(variant);

        // Act
        variantDAO.updateVariant(1L, updatedVariantDTO);

        // Assert
        verify(variantRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).findById(1L);
        verify(variantRepository, times(1)).save(any(Variant.class));
    }

    @Test
    void deleteVariant() {
        // Arrange
        when(variantRepository.existsById(1L)).thenReturn(true);

        // Act
        variantDAO.deleteVariant(1L);

        // Assert
        verify(variantRepository, times(1)).existsById(1L);
        verify(variantRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteVariant_NotFound() {
        // Arrange
        when(variantRepository.existsById(1L)).thenReturn(false);

        // Act & Assert
        assertThrows(ResponseStatusException.class, () -> variantDAO.deleteVariant(1L));
        verify(variantRepository, times(1)).existsById(1L);
        verify(variantRepository, times(0)).deleteById(1L);
    }
}
