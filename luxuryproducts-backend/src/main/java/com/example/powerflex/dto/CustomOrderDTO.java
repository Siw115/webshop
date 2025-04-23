package com.example.powerflex.dto;

import java.util.List;
import java.util.UUID;

public class CustomOrderDTO {
    private Long id;
    private String datum;
    private String orderStatus;
    private UUID customUserId;
    private List<OrderLineDTO> orderLines;
    private double totalPrice;  // Add this field

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public UUID getCustomUserId() {
        return customUserId;
    }

    public void setCustomUserId(UUID customUserId) {
        this.customUserId = customUserId;
    }

    public List<OrderLineDTO> getOrderLines() {
        return orderLines;
    }

    public void setOrderLines(List<OrderLineDTO> orderLines) {
        this.orderLines = orderLines;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
}
