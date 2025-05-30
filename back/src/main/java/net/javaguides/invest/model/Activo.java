package net.javaguides.invest.model;

import jakarta.persistence.*;

@Entity
@Table(name = "activos")
public class Activo {

    @Id
    @Column(name = "id_activo")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
}
