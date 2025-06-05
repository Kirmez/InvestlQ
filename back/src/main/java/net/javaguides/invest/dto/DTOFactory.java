package net.javaguides.invest.dto;

import net.javaguides.invest.model.Activo;
import net.javaguides.invest.model.CarteraActivos;

public class DTOFactory {

    public static CarteraResponseDTO fromCarteraActivos(CarteraActivos ca) {
        Activo a = ca.getActivo();
        return new CarteraResponseDTO(
                ca.getId(),
                a != null ? a.getNombre() : "Desconocido",
                ca.getCantidad(),
                ca.getPrecioCompra(),
                ca.getFechaCompra()
        );
    }
}
