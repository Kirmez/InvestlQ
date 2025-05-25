package net.javaguides.invest.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "cartera_activos")
public class CarteraActivos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private User usuario;

    @ManyToOne
    @JoinColumn(name = "id_activo")
    private Activo activo;

    @Column(name = "cantidad")
    private BigDecimal cantidad;

    @Column(name = "precio_compra")
    private BigDecimal precioCompra;

    @Column(name = "fecha_compra")
    private LocalDate fechaCompra;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUsuario() { return usuario; }
    public void setUsuario(User usuario) { this.usuario = usuario; }

    public Activo getActivo() { return activo; }
    public void setActivo(Activo activo) { this.activo = activo; }

    public BigDecimal getCantidad() { return cantidad; }
    public void setCantidad(BigDecimal cantidad) { this.cantidad = cantidad; }

    public BigDecimal getPrecioCompra() { return precioCompra; }
    public void setPrecioCompra(BigDecimal precioCompra) { this.precioCompra = precioCompra; }

    public LocalDate getFechaCompra() { return fechaCompra; }
    public void setFechaCompra(LocalDate fechaCompra) { this.fechaCompra = fechaCompra; }
}
