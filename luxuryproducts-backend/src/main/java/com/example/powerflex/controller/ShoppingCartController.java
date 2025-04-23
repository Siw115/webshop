//package com.example.powerflex.controller;
//
//import com.example.powerflex.dao.ShoppingCartDAO;
//import com.example.powerflex.dto.ShoppingCartDTO;
//import com.example.powerflex.models.ShoppingCart;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:4200")
//@RequestMapping("/shoppingcart")
//public class ShoppingCartController {
//
//    private final ShoppingCartDAO shoppingCartDAO;
//
//    public ShoppingCartController(ShoppingCartDAO shoppingCartDAO) {
//        this.shoppingCartDAO = shoppingCartDAO;
//    }
//
//    @GetMapping
//    public ResponseEntity<List<ShoppingCart>> getAllShoppingCarts(){
//        return ResponseEntity.ok(this.shoppingCartDAO.getAllShoppingCarts());
//    }
//
//    @GetMapping(params = "id")
//    public ResponseEntity<Optional<ShoppingCart>> getShoppingCartById(@RequestParam Long id){
//        return ResponseEntity.ok(this.shoppingCartDAO.getShoppingCartById(id));
//    }
//
//    @PostMapping
//    public ResponseEntity<String> createShoppingCart(@RequestBody ShoppingCartDTO shoppingCartDTO){
//        this.shoppingCartDAO.createShoppingCart(shoppingCartDTO);
//        return ResponseEntity.ok("Created a new shopping cart!");
//    }
//}
