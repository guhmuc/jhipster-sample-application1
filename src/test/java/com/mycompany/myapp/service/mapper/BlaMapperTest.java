package com.mycompany.myapp.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class BlaMapperTest {

    private BlaMapper blaMapper;

    @BeforeEach
    public void setUp() {
        blaMapper = new BlaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(blaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(blaMapper.fromId(null)).isNull();
    }
}
