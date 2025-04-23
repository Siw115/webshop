package com.example.powerflex.controller;

import com.example.powerflex.dao.VariantDAO;
import com.example.powerflex.dto.VariantDTO;
import com.example.powerflex.models.Variant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:19574", "http://s1149574.student.inf-hsleiden.nl:19574"})
@RequestMapping("/variant")
public class VariantController {

    private final VariantDAO variantDAO;

    @Autowired
    public VariantController(VariantDAO variantDAO) {
        this.variantDAO = variantDAO;
    }

    // Get all variants
    @GetMapping
    public ResponseEntity<List<Variant>> getAllVariants() {
        return ResponseEntity.ok(this.variantDAO.getAllVariants());
    }

    // Get a single variant by ID
    @GetMapping("/{id}")
    public ResponseEntity<Variant> getVariantById(@PathVariable Long id) {
        return ResponseEntity.ok(this.variantDAO.getVariantById(id));
    }

    // Create a new variant
    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<String> createVariant(@RequestBody VariantDTO variantDTO) {
        this.variantDAO.createVariant(variantDTO);
        return ResponseEntity.ok("Created a variant");
    }

    // Update an existing variant
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<VariantDTO> updateVariant(@PathVariable Long id, @RequestBody VariantDTO variantDTO) {
        variantDAO.updateVariant(id, variantDTO);
        return ResponseEntity.ok(variantDTO);
    }

    // Delete a variant
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Map<String, String>> deleteVariant(@PathVariable Long id) {
        variantDAO.deleteVariant(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Variant deleted successfully");
        return ResponseEntity.ok(response);
    }
}
