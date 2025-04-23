package com.example.powerflex;

import com.example.powerflex.models.OrderLine;
import com.example.powerflex.models.Product;
import com.example.powerflex.models.Variant;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class VariantTest {

    @Test
    void testNoArgsConstructor() {
        // Arrange & Act
        Variant variant = new Variant();

        // Assert
        assertThat(variant).isNotNull();
    }

    @Test
    void testAllArgsConstructor() {
        // Arrange & Act
        Variant variant = new Variant("Red", "M", 10.0, 100);

        // Assert
        assertThat(variant.getColor()).isEqualTo("Red");
        assertThat(variant.getSize()).isEqualTo("M");
        assertThat(variant.getAdditionalPrice()).isEqualTo(10.0);
        assertThat(variant.getStock()).isEqualTo(100);
    }

    @Test
    void testGettersAndSetters() {
        // Arrange
        Variant variant = new Variant();

        // Act
        variant.setId(1L);
        variant.setColor("Blue");
        variant.setSize("L");
        variant.setAdditionalPrice(15.0);
        variant.setStock(200);

        // Assert
        assertThat(variant.getId()).isEqualTo(1L);
        assertThat(variant.getColor()).isEqualTo("Blue");
        assertThat(variant.getSize()).isEqualTo("L");
        assertThat(variant.getAdditionalPrice()).isEqualTo(15.0);
        assertThat(variant.getStock()).isEqualTo(200);
    }

    @Test
    void testProductAssociation() {
        // Arrange
        Variant variant = new Variant();
        Product product = new Product();
        product.setId(1L);

        // Act
        variant.setProduct(product);

        // Assert
        assertThat(variant.getProduct()).isEqualTo(product);
    }

    @Test
    void testOrderLinesAssociation() {
        // Arrange
        Variant variant = new Variant();
        Set<OrderLine> orderLines = new HashSet<>();
        OrderLine orderLine = new OrderLine();
        orderLine.setVariant(variant);
        orderLines.add(orderLine);

        // Act
        variant.setOrderLines(orderLines);

        // Assert
        assertThat(variant.getOrderLines()).isEqualTo(orderLines);
    }
}
