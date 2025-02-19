package com.espe.estudiantes.controllers;

import com.espe.estudiantes.model.entities.Student;
import com.espe.estudiantes.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/estudiantes")
@CrossOrigin(origins = "http://localhost:5500") // Asegúrate de que el puerto coincida con tu frontend

public class StudentController {

    @Autowired
    private StudentService service;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Student student) {
        try {
            Student nuevoEstudiante = service.save(student);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEstudiante);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el estudiante: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Student>> listar() {
        try {
            List<Student> estudiantes = service.findAll();
            if (estudiantes.isEmpty()) {
                return ResponseEntity.noContent().build(); // Código 204 si no hay estudiantes
            }
            return ResponseEntity.ok(estudiantes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); // Devolver null en el body es aceptable con un código de error
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Optional<Student> estudianteOptional = service.findById(id);
            if (estudianteOptional.isPresent()) {
                return ResponseEntity.ok(estudianteOptional.get());
            } else {
                return ResponseEntity.notFound().build(); // Código 404
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al buscar el estudiante: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@RequestBody Student student, @PathVariable Long id) {
        try {
            Optional<Student> estudianteOptional = service.findById(id);
            if (estudianteOptional.isPresent()) {
                Student studentDB = estudianteOptional.get();
                studentDB.setNombre(student.getNombre());
                studentDB.setApellido(student.getApellido());
                studentDB.setEmail(student.getEmail());
                studentDB.setFechaNacimiento(student.getFechaNacimiento());
                studentDB.setTelefono(student.getTelefono());

                Student estudianteActualizado = service.save(studentDB);
                return ResponseEntity.ok(estudianteActualizado); // Código 200 OK con el objeto actualizado
            } else {
                return ResponseEntity.notFound().build(); // Código 404
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el estudiante: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            Optional<Student> estudianteOptional = service.findById(id);
            if (estudianteOptional.isPresent()) {
                service.deleteById(id);
                return ResponseEntity.noContent().build(); // Código 204 No Content (eliminación exitosa)
            } else {
                return ResponseEntity.notFound().build(); // Código 404
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el estudiante: " + e.getMessage());
        }
    }
}