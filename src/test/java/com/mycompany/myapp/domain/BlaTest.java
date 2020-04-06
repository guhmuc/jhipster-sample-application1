package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class BlaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bla.class);
        Bla bla1 = new Bla();
        bla1.setId(1L);
        Bla bla2 = new Bla();
        bla2.setId(bla1.getId());
        assertThat(bla1).isEqualTo(bla2);
        bla2.setId(2L);
        assertThat(bla1).isNotEqualTo(bla2);
        bla1.setId(null);
        assertThat(bla1).isNotEqualTo(bla2);
    }
}
