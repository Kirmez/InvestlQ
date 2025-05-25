package net.javaguides.invest.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CarteraResponseDTO {
    private Long carteraId;
    private String nombreActivo;
    private BigDecimal cantidad;
    private BigDecimal precioCompra;
    private LocalDate fechaCompra;

    public CarteraResponseDTO(Long carteraId, String nombreActivo, BigDecimal cantidad, BigDecimal precioCompra, LocalDate fechaCompra) {
        this.carteraId = carteraId;
        this.nombreActivo = nombreActivo;
        this.cantidad = cantidad;
        this.precioCompra = precioCompra;
        this.fechaCompra = fechaCompra;
    }

    public Long getCarteraId() { return carteraId; }
    public String getNombreActivo() { return nombreActivo; }
    public BigDecimal getCantidad() { return cantidad; }
    public BigDecimal getPrecioCompra() { return precioCompra; }
    public LocalDate getFechaCompra() { return fechaCompra; }

}
