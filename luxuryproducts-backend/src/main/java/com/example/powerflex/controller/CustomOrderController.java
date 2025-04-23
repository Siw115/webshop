package com.example.powerflex.controller;

import com.example.powerflex.dao.CustomOrderDAO;
import com.example.powerflex.dao.CustomOrderRepository;
import com.example.powerflex.dto.CustomOrderDTO;
import com.example.powerflex.dto.OrderLineDTO;
import com.example.powerflex.models.CustomOrder;
import com.example.powerflex.models.OrderLine;
import com.example.powerflex.models.Variant;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:19574", "http://s1149574.student.inf-hsleiden.nl:19574"})
@RequestMapping("/orders")
public class CustomOrderController {

    private final CustomOrderDAO customOrderDAO;
    private final CustomOrderRepository customOrderRepository;

    public CustomOrderController(CustomOrderDAO customOrderDAO, CustomOrderRepository customOrderRepository) {
        this.customOrderDAO = customOrderDAO;
        this.customOrderRepository = customOrderRepository;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<CustomOrderDTO>> getAllCustomOrders() {
        try {
            List<CustomOrder> orders = customOrderDAO.getAllCustomOrders();
            List<CustomOrderDTO> orderDTOs = orders.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(orderDTOs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomOrderDTO> getCustomOrderById(@PathVariable long id) {
        try {
            CustomOrder customOrder = customOrderDAO.getCustomOrderById(id);
            if (customOrder == null) {
                return ResponseEntity.status(404).body(null);
            }
            return ResponseEntity.ok(convertToDTO(customOrder));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<String> createFinishedOrder(@RequestBody CustomOrderDTO customOrderDTO) {
        try {
            Long orderId = customOrderDAO.createCustomOrder(customOrderDTO);
            return ResponseEntity.ok(orderId.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to create order: " + e.getMessage());
        }
    }

    // Controller
    @GetMapping("/user/{email}")
    public ResponseEntity<List<CustomOrderDTO>> getCustomOrdersByUserEmail(@PathVariable String email) {
        try {
            List<CustomOrder> customOrders = customOrderRepository.findByCustomUserEmail(email);
            if (customOrders == null || customOrders.isEmpty()) {
                return ResponseEntity.status(404).body(null);
            }
            List<CustomOrderDTO> orderDTOs = customOrders.stream().map(this::convertToDTO).collect(Collectors.toList());
            return ResponseEntity.ok(orderDTOs);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }


    private CustomOrderDTO convertToDTO(CustomOrder customOrder) {
        CustomOrderDTO dto = new CustomOrderDTO();
        dto.setId(customOrder.getId());
        dto.setDatum(customOrder.getDatum());
        dto.setOrderStatus(customOrder.getOrderStatus());
        dto.setCustomUserId(customOrder.getCustomUser().getId());

        final double[] totalPrice = {0};
        List<OrderLineDTO> orderLineDTOs = customOrder.getOrderLines().stream()
                .map(orderLine -> {
                    OrderLineDTO orderLineDTO = convertToDTO(orderLine);
                    totalPrice[0] += orderLineDTO.getProductPrice() * orderLineDTO.getQuantity();
                    return orderLineDTO;
                })
                .collect(Collectors.toList());
        dto.setOrderLines(orderLineDTOs);
        dto.setTotalPrice(totalPrice[0]);

        return dto;
    }

    private OrderLineDTO convertToDTO(OrderLine orderLine) {
        OrderLineDTO dto = new OrderLineDTO();
        dto.setVariantId(orderLine.getVariant().getId());
        dto.setQuantity(orderLine.getQuantity());

        // Set product details
        dto.setProductName(orderLine.getProduct().getName());
        dto.setProductDescription(orderLine.getProduct().getDescription());
        dto.setProductPrice(orderLine.getUnitPrice());

        // Set variant details
        dto.setVariantColor(orderLine.getVariant().getColor());
        dto.setVariantSize(orderLine.getVariant().getSize());

        return dto;
    }
}
