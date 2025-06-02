package net.javaguides.invest.repository;

import net.javaguides.invest.dto.CarteraResponseDTO;
import net.javaguides.invest.model.CarteraActivos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarteraRepository extends JpaRepository<CarteraActivos, Long> {

    @Query("""
        SELECT new net.javaguides.invest.dto.CarteraResponseDTO(
            ca.id, a.nombre, ca.cantidad, ca.precioCompra, ca.fechaCompra)
        FROM CarteraActivos ca
        JOIN ca.activo a
        WHERE ca.usuario.idUsuario = :userId
    """)
    List<CarteraResponseDTO> findCarteraByUsuarioId(@Param("userId") Long userId);

    List<CarteraActivos> findByUsuario_IdUsuarioAndActivo_Id(Long usuarioId, Long activoId);
}
