package com.espe.cursos.controllers;

import com.espe.cursos.model.entities.Curso;
import com.espe.cursos.model.Student;
import com.espe.cursos.services.CursoService;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "http://localhost:5500")
public class CursoController {

    @Autowired
    private CursoService service;

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Curso curso) {
        try {
            Curso nuevoCurso = service.save(curso);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoCurso);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el curso: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Curso>> listar() {
        try {
            List<Curso> cursos = service.findAll();
            if (cursos.isEmpty()) {
                return ResponseEntity.noContent().build(); // 204 si no hay cursos
            }
            return ResponseEntity.ok(cursos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            Optional<Curso> cursoOptional = service.findById(id);
            if (cursoOptional.isPresent()) {
                return ResponseEntity.ok(cursoOptional.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al buscar el curso: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> editar(@RequestBody Curso curso, @PathVariable Long id) {
        try {
            Optional<Curso> cursoOptional = service.findById(id);
            if (cursoOptional.isPresent()) {
                Curso cursoDB = cursoOptional.get();
                cursoDB.setNombre(curso.getNombre());
                cursoDB.setDescripcion(curso.getDescripcion());
                cursoDB.setCreditos(curso.getCreditos());

                Curso cursoActualizado = service.save(cursoDB);
                return ResponseEntity.ok(cursoActualizado);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar el curso: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            Optional<Curso> cursoOptional = service.findById(id);
            if (cursoOptional.isPresent()) {
                service.deleteById(id);
                return ResponseEntity.noContent().build(); // 204 No Content
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar el curso: " + e.getMessage());
        }
    }

    @PostMapping("/{id}/usuarios") // Mejorar la semántica del endpoint
    public ResponseEntity<?> agregarUsuario(@RequestBody Student usuario, @PathVariable Long id) {
        Optional<Student> optional;
        try {
            optional = service.addUser(usuario, id);
        } catch (FeignException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Collections.singletonMap("error", "Usuario no encontrado: " + ex.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", "Error al agregar usuario: " + e.getMessage()));
        }

        if (optional.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(optional.get());
        }
        return ResponseEntity.notFound().build();
    }

    // Puedes agregar endpoints para eliminar usuarios de un curso si es necesario
    // y los métodos correspondientes en el service.

}