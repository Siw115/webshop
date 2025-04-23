package com.example.powerflex.dao;

import com.example.powerflex.dto.OrderLineDTO;
import com.example.powerflex.models.CustomOrder;
import com.example.powerflex.models.OrderLine;
import com.example.powerflex.models.Product;
import com.example.powerflex.models.Variant;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Component
public class OrderLineDAO {
    private final OrderLineRepository orderLineRepository;
    private final VariantRepository variantRepository;

    public OrderLineDAO(OrderLineRepository orderLineRepository, VariantRepository variantRepository) {
        this.orderLineRepository = orderLineRepository;
        this.variantRepository = variantRepository;
    }

    public OrderLine createOrderLine(OrderLineDTO orderLineDTO, CustomOrder customOrder) {
        Optional<Variant> variantOptional = this.variantRepository.findById(orderLineDTO.getVariantId());

        if (!variantOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Variant ID not found");
        }

        Variant variant = variantOptional.get();
        // Check if there's enough stock
        if (variant.getStock() < orderLineDTO.getQuantity()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Insufficient stock for variant ID " + variant.getId());
        }

        // Decrease the stock
        variant.setStock((int) (variant.getStock() - orderLineDTO.getQuantity()));
        this.variantRepository.save(variant);
        Product product = variant.getProduct();

        OrderLine orderLine = new OrderLine(
                variant.getAdditionalPrice(),
                orderLineDTO.getQuantity(),
                customOrder,
                product,
                variant
        );

        return this.orderLineRepository.save(orderLine);
    }

}
