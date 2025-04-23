package com.example.powerflex;

import com.example.powerflex.dao.VariantDAO;
import com.example.powerflex.dto.VariantDTO;
import com.example.powerflex.models.Variant;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
class VariantControllerTest {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @MockBean
    private VariantDAO variantDAO;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void testGetAllVariants() throws Exception {
        // Arrange
        Variant variant = new Variant("Red", "M", 10.0, 100);
        when(variantDAO.getAllVariants()).thenReturn(Collections.singletonList(variant));

        // Act & Assert
        mockMvc.perform(get("/variant")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].color").value("Red"));

        // Verify
        verify(variantDAO, times(1)).getAllVariants();
    }

    @Test
    void testGetVariantById() throws Exception {
        // Arrange
        Variant variant = new Variant("Red", "M", 10.0, 100);
        when(variantDAO.getVariantById(1L)).thenReturn(variant);

        // Act & Assert
        mockMvc.perform(get("/variant/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.color").value("Red"));

        // Verify
        verify(variantDAO, times(1)).getVariantById(1L);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testCreateVariant() throws Exception {
        // Arrange
        VariantDTO variantDTO = new VariantDTO("Red", "M", 10.0, 100, 1L);
        doNothing().when(variantDAO).createVariant(any(VariantDTO.class));
        String variantJson = "{\"color\": \"Red\", \"size\": \"M\", \"additionalPrice\": 10.0, \"stock\": 100, \"productId\": 1}";

        // Act & Assert
        mockMvc.perform(post("/variant")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(variantJson))
                .andExpect(status().isOk())
                .andExpect(content().string("Created a variant"));

        // Verify
        verify(variantDAO, times(1)).createVariant(any(VariantDTO.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testUpdateVariant() throws Exception {
        // Arrange
        VariantDTO variantDTO = new VariantDTO("Blue", "L", 15.0, 200, 1L);
        doNothing().when(variantDAO).updateVariant(eq(1L), any(VariantDTO.class));
        String variantJson = "{\"color\": \"Blue\", \"size\": \"L\", \"additionalPrice\": 15.0, \"stock\": 200, \"productId\": 1}";

        // Act & Assert
        mockMvc.perform(put("/variant/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(variantJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.color").value("Blue"));

        // Verify
        verify(variantDAO, times(1)).updateVariant(eq(1L), any(VariantDTO.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void testDeleteVariant() throws Exception {
        // Arrange
        doNothing().when(variantDAO).deleteVariant(1L);

        // Act & Assert
        mockMvc.perform(delete("/variant/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Variant deleted successfully"));

        // Verify
        verify(variantDAO, times(1)).deleteVariant(1L);
    }
}
