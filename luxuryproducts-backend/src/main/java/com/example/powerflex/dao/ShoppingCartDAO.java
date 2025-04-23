//package com.example.powerflex.dao;
//
//import com.example.powerflex.dto.ShoppingCartDTO;
//import com.example.powerflex.models.CustomUser;
//import com.example.powerflex.models.ShoppingCart;
//import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.util.List;
//import java.util.Optional;
//
//@Component
//public class ShoppingCartDAO {
//
//    private final ShoppingCartRepository shoppingCartRepository;
//    private final UserRepository userRepository;
//
//    public ShoppingCartDAO(ShoppingCartRepository shoppingCartRepository, UserRepository userRepository) {
//        this.shoppingCartRepository = shoppingCartRepository;
//        this.userRepository = userRepository;
//    }
//
//    public List<ShoppingCart> getAllShoppingCarts() {
//        return this.shoppingCartRepository.findAll();
//    }
//
//    public Optional<ShoppingCart> getShoppingCartById(Long id) {
//        return this.shoppingCartRepository.findById(id);
//    }
//
//    public void createShoppingCart(ShoppingCartDTO shoppingCartDTO) {
//        CustomUser customUser = this.userRepository.findById(shoppingCartDTO.userId).get();
//        this.shoppingCartRepository.save(new ShoppingCart(customUser));
//    }
//}
//
//
//
////        if (customUser.isPresent()) {
//
////            customUser.get().setShoppingCart(shoppingCart);
////            this.userRepository.save(customUser.get());
////            return;
////        }
////        throw new ResponseStatusException(
////                HttpStatus.NOT_FOUND, "User not found"
////        );
//
