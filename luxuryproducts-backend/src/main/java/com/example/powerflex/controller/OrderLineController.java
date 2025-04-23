package com.example.powerflex.controller;

import com.example.powerflex.dao.OrderLineRepository;
import com.example.powerflex.dao.UserRepository;
import com.example.powerflex.dto.CustomOrderDTO;
import com.example.powerflex.dto.OrderLineDTO;
import com.example.powerflex.models.CustomOrder;
import com.example.powerflex.dao.CustomOrderRepository;
import com.example.powerflex.dao.OrderLineDAO;
import com.example.powerflex.models.OrderLine;
import com.example.powerflex.models.CustomUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:19574", "http://s1149574.student.inf-hsleiden.nl:19574"})
@RequestMapping("/orderlines")
public class OrderLineController {

    private final CustomOrderRepository customOrderRepository;
    private final OrderLineDAO orderLineDAO;
    private final UserRepository userRepository;
    private final OrderLineRepository orderLineRepository;


    public OrderLineController(CustomOrderRepository customOrderRepository, OrderLineDAO orderLineDAO, UserRepository userRepository,
                               OrderLineRepository orderLineRepository) {
        this.customOrderRepository = customOrderRepository;
        this.orderLineDAO = orderLineDAO;
        this.userRepository = userRepository;
        this.orderLineRepository = orderLineRepository;
    }

    @PostMapping
    public ResponseEntity<String> createOrderWithLines(@RequestBody CustomOrderDTO customOrderDTO) {
        UUID customUserId = customOrderDTO.getCustomUserId();
        Optional<CustomUser> customUserOptional = userRepository.findById(customUserId);

        if (!customUserOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User ID not found: " + customUserId);
        }

        CustomUser customUser = customUserOptional.get();

        CustomOrder customOrder = new CustomOrder();
        customOrder.setDatum(customOrderDTO.getDatum());
        customOrder.setOrderStatus(customOrderDTO.getOrderStatus());
        customOrder.setCustomUser(customUser);

        // Save the CustomOrder first
        customOrder = customOrderRepository.save(customOrder);

        Set<OrderLine> orderLines = new HashSet<>();
        for (OrderLineDTO orderLineDTO : customOrderDTO.getOrderLines()) {
            try {
                OrderLine orderLine = orderLineDAO.createOrderLine(orderLineDTO, customOrder);
                orderLines.add(orderLine);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error creating OrderLine: " + e.getMessage());
            }
        }

        customOrder.setOrderLines(orderLines);
        customOrder = customOrderRepository.save(customOrder);

        return ResponseEntity.ok("Created a new order item named ");
    }
}
