package net.javaguides.invest.repository;

import net.javaguides.invest.dto.CarteraResponseDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguides.invest.model.CarteraActivos;

import java.util.List;

public interface CarteraRepository extends JpaRepository<CarteraActivos, Long> {

    @Query("""
        SELECT new net.javaguides.invest.dto.CarteraResponseDTO(
            ca.id, a.nombre, ca.cantidad, ca.precioCompra, ca.fechaCompra)
        FROM CarteraActivos ca
        JOIN ca.activo a
        WHERE ca.usuario.id = :userId
    """)
    List<CarteraResponseDTO> findCarteraByUsuarioId(@Param("userId") Long userId);
}
