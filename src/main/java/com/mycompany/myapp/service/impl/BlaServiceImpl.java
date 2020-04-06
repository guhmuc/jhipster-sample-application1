package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.service.BlaService;
import com.mycompany.myapp.domain.Bla;
import com.mycompany.myapp.repository.BlaRepository;
import com.mycompany.myapp.service.dto.BlaDTO;
import com.mycompany.myapp.service.mapper.BlaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Bla}.
 */
@Service
@Transactional
public class BlaServiceImpl implements BlaService {

    private final Logger log = LoggerFactory.getLogger(BlaServiceImpl.class);

    private final BlaRepository blaRepository;

    private final BlaMapper blaMapper;

    public BlaServiceImpl(BlaRepository blaRepository, BlaMapper blaMapper) {
        this.blaRepository = blaRepository;
        this.blaMapper = blaMapper;
    }

    /**
     * Save a bla.
     *
     * @param blaDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BlaDTO save(BlaDTO blaDTO) {
        log.debug("Request to save Bla : {}", blaDTO);
        Bla bla = blaMapper.toEntity(blaDTO);
        bla = blaRepository.save(bla);
        return blaMapper.toDto(bla);
    }

    /**
     * Get all the blas.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<BlaDTO> findAll() {
        log.debug("Request to get all Blas");
        return blaRepository.findAll().stream()
            .map(blaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one bla by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BlaDTO> findOne(Long id) {
        log.debug("Request to get Bla : {}", id);
        return blaRepository.findById(id)
            .map(blaMapper::toDto);
    }

    /**
     * Delete the bla by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bla : {}", id);
        blaRepository.deleteById(id);
    }
}
