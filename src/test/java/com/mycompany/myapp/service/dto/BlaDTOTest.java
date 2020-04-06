package com.mycompany.myapp.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class BlaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BlaDTO.class);
        BlaDTO blaDTO1 = new BlaDTO();
        blaDTO1.setId(1L);
        BlaDTO blaDTO2 = new BlaDTO();
        assertThat(blaDTO1).isNotEqualTo(blaDTO2);
        blaDTO2.setId(blaDTO1.getId());
        assertThat(blaDTO1).isEqualTo(blaDTO2);
        blaDTO2.setId(2L);
        assertThat(blaDTO1).isNotEqualTo(blaDTO2);
        blaDTO1.setId(null);
        assertThat(blaDTO1).isNotEqualTo(blaDTO2);
    }
}
