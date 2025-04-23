package com.example.powerflex.dao;

import com.example.powerflex.dto.CustomOrderDTO;
import com.example.powerflex.dto.OrderLineDTO;
import com.example.powerflex.models.CustomOrder;
import com.example.powerflex.models.CustomUser;
import com.example.powerflex.models.OrderLine;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Component
public class CustomOrderDAO {

    private final CustomOrderRepository customOrderRepository;
    private final UserRepository userRepository;
    private final VariantRepository variantRepository;
    private final OrderLineDAO orderLineDAO;

    public CustomOrderDAO(CustomOrderRepository customOrderRepository, UserRepository userRepository, VariantRepository variantRepository, OrderLineDAO orderLineDAO) {
        this.customOrderRepository = customOrderRepository;
        this.userRepository = userRepository;
        this.variantRepository = variantRepository;
        this.orderLineDAO = orderLineDAO;
    }

    public List<CustomOrder> getAllCustomOrders() {
        return this.customOrderRepository.findAll();
    }

    public CustomOrder getCustomOrderById(long id) {
        Optional<CustomOrder> customOrderOptional = this.customOrderRepository.findById(id);
        if (customOrderOptional.isPresent()) {
            return customOrderOptional.get();
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order ID not found");
    }

    public long createCustomOrder(CustomOrderDTO customOrderDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = this.userRepository.findByEmail(authentication.getName());

        CustomOrder customOrder = new CustomOrder(customOrderDTO.getDatum(), customOrderDTO.getOrderStatus(), customUser);

        Set<OrderLine> orderLines = new HashSet<>();
        for (OrderLineDTO orderLineDTO : customOrderDTO.getOrderLines()) {
            OrderLine orderLine = this.orderLineDAO.createOrderLine(orderLineDTO, customOrder);
            orderLines.add(orderLine);
        }

        customOrder.setOrderLines(orderLines);
        this.customOrderRepository.save(customOrder);

        return customOrder.getId();
    }
}
