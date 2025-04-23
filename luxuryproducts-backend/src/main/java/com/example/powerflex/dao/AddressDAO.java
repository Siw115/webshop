package com.example.powerflex.dao;

import com.example.powerflex.dto.AddressDTO;
import com.example.powerflex.dto.OrderLineDTO;
import com.example.powerflex.models.Address;
import com.example.powerflex.models.CustomOrder;
import com.example.powerflex.models.CustomUser;
import com.example.powerflex.models.OrderLine;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class AddressDAO {
    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public AddressDAO(UserRepository userRepository, AddressRepository addressRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
    }

    @Transactional
    public void createAddress(AddressDTO addressDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = this.userRepository.findByEmail(authentication.getName());
        System.out.println("Address created lel");
        Address address = new Address(addressDTO.street, addressDTO.city, addressDTO.state, addressDTO.postalCode, addressDTO.country, customUser);
        System.out.println(addressDTO.street);
        this.addressRepository.save(address);
    }

    @Transactional
    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

    public Address updateAddress(Long id, Address updatedAddress) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        // Update the address fields
        address.setStreet(updatedAddress.getStreet());
        address.setCity(updatedAddress.getCity());
        address.setCountry(updatedAddress.getCountry());
        address.setPostalCode(updatedAddress.getPostalCode());
        address.setState(updatedAddress.getState());
        // ... other fields ...

        return addressRepository.save(address);
    }
}
