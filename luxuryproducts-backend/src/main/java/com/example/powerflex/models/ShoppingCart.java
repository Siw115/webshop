//package com.example.powerflex.models;
//
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//
//import java.util.Set;
//
//@Entity
//public class ShoppingCart {
//    @Id
//    @GeneratedValue
//    private Long id;
//
//    @OneToMany(mappedBy = "shoppingCart")
//    @JsonManagedReference
//    private Set<OrderLine> orderLines;
//
//    @OneToOne(mappedBy = "shoppingCart")
//    private CustomUser customUser;
//
//    public ShoppingCart() {
//    }
//
//    public ShoppingCart(CustomUser customUser) {
//        this.customUser = customUser;
//    }
//
//    public Set<OrderLine> getOrderItems() {
//        return orderLines;
//    }
//
//    public void setOrderItems(Set<OrderLine> orderLines) {
//        this.orderLines = orderLines;
//    }
//
//    public CustomUser getCustomUser() {
//        return customUser;
//    }
//
//    public void setCustomUser(CustomUser customUser) {
//        this.customUser = customUser;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//}
