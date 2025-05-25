package net.javaguides.invest.controller;

import net.javaguides.invest.dto.CarteraResponseDTO;
import net.javaguides.invest.repository.CarteraRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class CarteraController {

    private final CarteraRepository carteraRepository;

    public CarteraController(CarteraRepository carteraRepository) {
        this.carteraRepository = carteraRepository;
    }

    @GetMapping("/{id}/cartera")
    public List<CarteraResponseDTO> getUserCartera(@PathVariable Long id) {
        return carteraRepository.findCarteraByUsuarioId(id);
    }
}
