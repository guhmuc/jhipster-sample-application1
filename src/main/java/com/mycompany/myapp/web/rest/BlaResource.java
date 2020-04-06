package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.BlaService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.BlaDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Bla}.
 */
@RestController
@RequestMapping("/api")
public class BlaResource {

    private final Logger log = LoggerFactory.getLogger(BlaResource.class);

    private static final String ENTITY_NAME = "bla";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BlaService blaService;

    public BlaResource(BlaService blaService) {
        this.blaService = blaService;
    }

    /**
     * {@code POST  /blas} : Create a new bla.
     *
     * @param blaDTO the blaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new blaDTO, or with status {@code 400 (Bad Request)} if the bla has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/blas")
    public ResponseEntity<BlaDTO> createBla(@RequestBody BlaDTO blaDTO) throws URISyntaxException {
        log.debug("REST request to save Bla : {}", blaDTO);
        if (blaDTO.getId() != null) {
            throw new BadRequestAlertException("A new bla cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BlaDTO result = blaService.save(blaDTO);
        return ResponseEntity.created(new URI("/api/blas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /blas} : Updates an existing bla.
     *
     * @param blaDTO the blaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated blaDTO,
     * or with status {@code 400 (Bad Request)} if the blaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the blaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/blas")
    public ResponseEntity<BlaDTO> updateBla(@RequestBody BlaDTO blaDTO) throws URISyntaxException {
        log.debug("REST request to update Bla : {}", blaDTO);
        if (blaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BlaDTO result = blaService.save(blaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, blaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /blas} : get all the blas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of blas in body.
     */
    @GetMapping("/blas")
    public List<BlaDTO> getAllBlas() {
        log.debug("REST request to get all Blas");
        return blaService.findAll();
    }

    /**
     * {@code GET  /blas/:id} : get the "id" bla.
     *
     * @param id the id of the blaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the blaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/blas/{id}")
    public ResponseEntity<BlaDTO> getBla(@PathVariable Long id) {
        log.debug("REST request to get Bla : {}", id);
        Optional<BlaDTO> blaDTO = blaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(blaDTO);
    }

    /**
     * {@code DELETE  /blas/:id} : delete the "id" bla.
     *
     * @param id the id of the blaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/blas/{id}")
    public ResponseEntity<Void> deleteBla(@PathVariable Long id) {
        log.debug("REST request to delete Bla : {}", id);
        blaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
