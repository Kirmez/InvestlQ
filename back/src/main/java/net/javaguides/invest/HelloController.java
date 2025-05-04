package net.javaguides.invest;

import org.springframework.web.bind.annotation.*;
import java.sql.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello from backend Kirill!";
    }

    @GetMapping("/pacientes")
    public List<Map<String, Object>> getPacientes() {
        List<Map<String, Object>> pacientes = new ArrayList<>();
        
        try (Connection conn = DriverManager.getConnection("jdbc:sqlite:src/main/resources/test.db");
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM paciente")) {
            
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, Object> paciente = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    paciente.put(metaData.getColumnName(i), rs.getObject(i));
                }
                pacientes.add(paciente);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            // Return error information in development
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Database error");
            error.put("message", e.getMessage());
            pacientes.add(error);
        }
        
        return pacientes;
    }
}