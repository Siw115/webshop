package com.example.powerflex.controller;

import com.example.powerflex.dao.AddressDAO;
import com.example.powerflex.dao.CategoryDAO;
import com.example.powerflex.dto.AddressDTO;
import com.example.powerflex.dto.CategoryDTO;
import com.example.powerflex.models.Address;
import com.example.powerflex.models.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:19574", "http://s1149574.student.inf-hsleiden.nl:19574"})
@RequestMapping("/address")
public class AddressController {

    private final AddressDAO addressDAO;

    public AddressController(AddressDAO addressDAO) {
        this.addressDAO = addressDAO;
    }

    @PostMapping
    public ResponseEntity<String> createAddress(@RequestBody AddressDTO addressDTO){
        this.addressDAO.createAddress(addressDTO);
        return ResponseEntity.ok("Added a new address to the user.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long id) {
        try {
            addressDAO.deleteAddress(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting address: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Long id, @RequestBody Address updatedAddress) {
        try {
            Address address = addressDAO.updateAddress(id, updatedAddress);
            return ResponseEntity.ok(address); // or any other appropriate response
        } catch (Exception e) {
            // Error handling logic here
            return ResponseEntity.badRequest().body("Error updating address: " + e.getMessage());
        }
    }
}
