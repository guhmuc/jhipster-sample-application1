package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.BlaDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Bla}.
 */
public interface BlaService {

    /**
     * Save a bla.
     *
     * @param blaDTO the entity to save.
     * @return the persisted entity.
     */
    BlaDTO save(BlaDTO blaDTO);

    /**
     * Get all the blas.
     *
     * @return the list of entities.
     */
    List<BlaDTO> findAll();

    /**
     * Get the "id" bla.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BlaDTO> findOne(Long id);

    /**
     * Delete the "id" bla.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
