package net.javaguides.invest.controller;

import net.javaguides.invest.model.Activo;
import net.javaguides.invest.repository.ActivoRepository;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/activos")
@CrossOrigin(origins = "http://localhost:3000")
public class ActivoController {

    private final ActivoRepository activoRepository;

    public ActivoController(ActivoRepository activoRepository) {
        this.activoRepository = activoRepository;
    }

    @GetMapping
    public List<Activo> getAllActivos() {
        return activoRepository.findAll();
    }

    @GetMapping("/pnl")
    public List<Map<String, Object>> getActivosWithPnL() {
        Random rand = new Random();
        List<Activo> activos = activoRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Activo a : activos) {
            Map<String, Object> item = new HashMap<>();
            item.put("id", a.getId());
            item.put("nombre", a.getNombre());
            BigDecimal pnl = BigDecimal.valueOf(rand.nextDouble() * 20 - 10)
                                       .setScale(2, BigDecimal.ROUND_HALF_UP);
            item.put("pnl", pnl);
            result.add(item);
        }

        return result;
    }
}
