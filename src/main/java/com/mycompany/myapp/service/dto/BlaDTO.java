package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Bla} entity.
 */
public class BlaDTO implements Serializable {
    
    private Long id;

    private String foo;

    private String bar;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoo() {
        return foo;
    }

    public void setFoo(String foo) {
        this.foo = foo;
    }

    public String getBar() {
        return bar;
    }

    public void setBar(String bar) {
        this.bar = bar;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BlaDTO blaDTO = (BlaDTO) o;
        if (blaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlaDTO{" +
            "id=" + getId() +
            ", foo='" + getFoo() + "'" +
            ", bar='" + getBar() + "'" +
            "}";
    }
}
