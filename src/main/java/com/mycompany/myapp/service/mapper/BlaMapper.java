package com.mycompany.myapp.service.mapper;


import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.BlaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bla} and its DTO {@link BlaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BlaMapper extends EntityMapper<BlaDTO, Bla> {



    default Bla fromId(Long id) {
        if (id == null) {
            return null;
        }
        Bla bla = new Bla();
        bla.setId(id);
        return bla;
    }
}
