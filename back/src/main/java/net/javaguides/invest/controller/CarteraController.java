package net.javaguides.invest.controller;

import net.javaguides.invest.dto.CarteraResponseDTO;
import net.javaguides.invest.model.Activo;
import net.javaguides.invest.model.CarteraActivos;
import net.javaguides.invest.model.User;
import net.javaguides.invest.repository.ActivoRepository;
import net.javaguides.invest.repository.CarteraRepository;
import net.javaguides.invest.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class CarteraController {

    private final CarteraRepository carteraRepository;
    private final UserRepository userRepository;
    private final ActivoRepository activoRepository;

    public CarteraController(CarteraRepository carteraRepository,
                             UserRepository userRepository,
                             ActivoRepository activoRepository) {
        this.carteraRepository = carteraRepository;
        this.userRepository = userRepository;
        this.activoRepository = activoRepository;
    }

    // ------------- Obtener cartera de un usuario -------------
    @GetMapping("/{id}/cartera")
    public List<CarteraResponseDTO> getUserCartera(@PathVariable Long id) {
        return carteraRepository.findCarteraByUsuarioId(id);
    }

    // ------------- Comprar / Vender un activo -------------
    @PostMapping("/{id}/cartera/accion")
    public ResponseEntity<?> modificarCartera(
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload) {

        Long idActivo = Long.valueOf(payload.get("idActivo").toString());
        String tipo   = payload.get("tipo").toString();      
        BigDecimal cantidad = new BigDecimal(payload.get("cantidad").toString());
        BigDecimal precio   = new BigDecimal(payload.get("precioCompra").toString());

        Optional<User> userOpt     = userRepository.findById(id);
        Optional<Activo> activoOpt = activoRepository.findById(idActivo);

        if (userOpt.isEmpty() || activoOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Usuario o Activo no encontrado");
        }

        User usuario = userOpt.get();
        Activo activo = activoOpt.get();

        List<CarteraActivos> existentes =
            carteraRepository.findByUsuario_IdUsuarioAndActivo_Id(id, idActivo);

        CarteraActivos entrada;

        if ("buy".equals(tipo)) {
            if (existentes.isEmpty()) {
                entrada = new CarteraActivos();
                entrada.setUsuario(usuario);
                entrada.setActivo(activo);
                entrada.setCantidad(cantidad);
            } else {
                entrada = existentes.get(0);
                entrada.setCantidad(entrada.getCantidad().add(cantidad));
            }
            entrada.setPrecioCompra(precio);
            entrada.setFechaCompra(LocalDate.now());
            carteraRepository.save(entrada);
            return ResponseEntity.ok("Compra realizada");

        } else if ("sell".equals(tipo)) {
            if (existentes.isEmpty()) {
                return ResponseEntity.badRequest().body("No tiene este activo");
            }
            entrada = existentes.get(0);
            BigDecimal restante = entrada.getCantidad().subtract(cantidad);
            if (restante.compareTo(BigDecimal.ZERO) <= 0) {
                carteraRepository.delete(entrada);
            } else {
                entrada.setCantidad(restante);
                carteraRepository.save(entrada);
            }
            return ResponseEntity.ok("Venta realizada");
        }

        return ResponseEntity.badRequest().body("Tipo de operación inválido");
    }
}
