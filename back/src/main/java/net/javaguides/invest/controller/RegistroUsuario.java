package net.javaguides.invest.controller;

import java.sql.*;
import java.util.Scanner;
import java.util.concurrent.ThreadLocalRandom;

public class RegistroUsuario {
    private static final String URL = "jdbc:mysql://localhost:3306/investql";
    private static final String USER = "root";
    private static final String PASSWORD = "tu_contraseña";

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {

            System.out.println("=== Registro de Nuevo Usuario ===");
            System.out.print("Nombre: ");
            String nombre = scanner.nextLine();

            System.out.print("Email: ");
            String email = scanner.nextLine();

            System.out.print("Contraseña: ");
            String contraseña = scanner.nextLine();

            System.out.print("Nivel de riesgo (bajo/medio/alto): ");
            String nivelRiesgo = scanner.nextLine();

            System.out.print("Horizonte de inversión (meses): ");
            int horizonte = scanner.nextInt();

            registrarUsuario(nombre, email, contraseña, nivelRiesgo, horizonte);
        }
    }

    public static void registrarUsuario(String nombre, String email, String contraseña,
                                      String nivelRiesgo, int horizonte) {
        long idUsuario = ThreadLocalRandom.current().nextLong(1_000_000L, 10_000_000L);
        
        String sql = "INSERT INTO usuarios (id_usuario, nombre, email, contraseña_hash, " +
             "nivel_riesgo, horizonte_inversion, fecha_registro) " +
             "VALUES (?, ?, ?, ?, ?, ?, NOW())";


        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setLong(1, idUsuario);
            pstmt.setString(2, nombre);
            pstmt.setString(3, email);
            pstmt.setString(4, contraseña);
            pstmt.setString(5, nivelRiesgo);
            pstmt.setInt(6, horizonte);

            int filasAfectadas = pstmt.executeUpdate();
            System.out.println(filasAfectadas + " usuario registrado exitosamente!");
            System.out.println("ID asignado: " + idUsuario);

        } catch (SQLException e) {
            if (e.getErrorCode() == 1062) { 
                System.out.println("ID duplicado generado, intentando nuevamente...");
                registrarUsuario(nombre, email, contraseña, nivelRiesgo, horizonte);
            } else {
                System.err.println("Error al registrar usuario: " + e.getMessage());
                e.printStackTrace();
            }
        }
    }
}