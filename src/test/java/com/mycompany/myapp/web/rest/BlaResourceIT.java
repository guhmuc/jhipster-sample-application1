package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplication1App;
import com.mycompany.myapp.domain.Bla;
import com.mycompany.myapp.repository.BlaRepository;
import com.mycompany.myapp.service.BlaService;
import com.mycompany.myapp.service.dto.BlaDTO;
import com.mycompany.myapp.service.mapper.BlaMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BlaResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplication1App.class)

@AutoConfigureMockMvc
@WithMockUser
public class BlaResourceIT {

    private static final String DEFAULT_FOO = "AAAAAAAAAA";
    private static final String UPDATED_FOO = "BBBBBBBBBB";

    private static final String DEFAULT_BAR = "AAAAAAAAAA";
    private static final String UPDATED_BAR = "BBBBBBBBBB";

    @Autowired
    private BlaRepository blaRepository;

    @Autowired
    private BlaMapper blaMapper;

    @Autowired
    private BlaService blaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBlaMockMvc;

    private Bla bla;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bla createEntity(EntityManager em) {
        Bla bla = new Bla()
            .foo(DEFAULT_FOO)
            .bar(DEFAULT_BAR);
        return bla;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bla createUpdatedEntity(EntityManager em) {
        Bla bla = new Bla()
            .foo(UPDATED_FOO)
            .bar(UPDATED_BAR);
        return bla;
    }

    @BeforeEach
    public void initTest() {
        bla = createEntity(em);
    }

    @Test
    @Transactional
    public void createBla() throws Exception {
        int databaseSizeBeforeCreate = blaRepository.findAll().size();

        // Create the Bla
        BlaDTO blaDTO = blaMapper.toDto(bla);
        restBlaMockMvc.perform(post("/api/blas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blaDTO)))
            .andExpect(status().isCreated());

        // Validate the Bla in the database
        List<Bla> blaList = blaRepository.findAll();
        assertThat(blaList).hasSize(databaseSizeBeforeCreate + 1);
        Bla testBla = blaList.get(blaList.size() - 1);
        assertThat(testBla.getFoo()).isEqualTo(DEFAULT_FOO);
        assertThat(testBla.getBar()).isEqualTo(DEFAULT_BAR);
    }

    @Test
    @Transactional
    public void createBlaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = blaRepository.findAll().size();

        // Create the Bla with an existing ID
        bla.setId(1L);
        BlaDTO blaDTO = blaMapper.toDto(bla);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBlaMockMvc.perform(post("/api/blas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bla in the database
        List<Bla> blaList = blaRepository.findAll();
        assertThat(blaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBlas() throws Exception {
        // Initialize the database
        blaRepository.saveAndFlush(bla);

        // Get all the blaList
        restBlaMockMvc.perform(get("/api/blas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bla.getId().intValue())))
            .andExpect(jsonPath("$.[*].foo").value(hasItem(DEFAULT_FOO)))
            .andExpect(jsonPath("$.[*].bar").value(hasItem(DEFAULT_BAR)));
    }
    
    @Test
    @Transactional
    public void getBla() throws Exception {
        // Initialize the database
        blaRepository.saveAndFlush(bla);

        // Get the bla
        restBlaMockMvc.perform(get("/api/blas/{id}", bla.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bla.getId().intValue()))
            .andExpect(jsonPath("$.foo").value(DEFAULT_FOO))
            .andExpect(jsonPath("$.bar").value(DEFAULT_BAR));
    }

    @Test
    @Transactional
    public void getNonExistingBla() throws Exception {
        // Get the bla
        restBlaMockMvc.perform(get("/api/blas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBla() throws Exception {
        // Initialize the database
        blaRepository.saveAndFlush(bla);

        int databaseSizeBeforeUpdate = blaRepository.findAll().size();

        // Update the bla
        Bla updatedBla = blaRepository.findById(bla.getId()).get();
        // Disconnect from session so that the updates on updatedBla are not directly saved in db
        em.detach(updatedBla);
        updatedBla
            .foo(UPDATED_FOO)
            .bar(UPDATED_BAR);
        BlaDTO blaDTO = blaMapper.toDto(updatedBla);

        restBlaMockMvc.perform(put("/api/blas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blaDTO)))
            .andExpect(status().isOk());

        // Validate the Bla in the database
        List<Bla> blaList = blaRepository.findAll();
        assertThat(blaList).hasSize(databaseSizeBeforeUpdate);
        Bla testBla = blaList.get(blaList.size() - 1);
        assertThat(testBla.getFoo()).isEqualTo(UPDATED_FOO);
        assertThat(testBla.getBar()).isEqualTo(UPDATED_BAR);
    }

    @Test
    @Transactional
    public void updateNonExistingBla() throws Exception {
        int databaseSizeBeforeUpdate = blaRepository.findAll().size();

        // Create the Bla
        BlaDTO blaDTO = blaMapper.toDto(bla);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBlaMockMvc.perform(put("/api/blas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(blaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bla in the database
        List<Bla> blaList = blaRepository.findAll();
        assertThat(blaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBla() throws Exception {
        // Initialize the database
        blaRepository.saveAndFlush(bla);

        int databaseSizeBeforeDelete = blaRepository.findAll().size();

        // Delete the bla
        restBlaMockMvc.perform(delete("/api/blas/{id}", bla.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Bla> blaList = blaRepository.findAll();
        assertThat(blaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
