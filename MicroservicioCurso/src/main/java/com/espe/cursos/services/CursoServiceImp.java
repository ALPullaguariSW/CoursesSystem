package com.espe.cursos.services;
import com.espe.cursos.clients.usuarioClientRest;
import com.espe.cursos.model.entities.Curso;
import com.espe.cursos.model.entities.CursoUsuario;
import com.espe.cursos.model.Student;
import com.espe.cursos.repositories.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CursoServiceImp implements CursoService {
    @Autowired
    private CursoRepository cursoRepository;
    @Override
    public List<Curso> findAll() {
        return (List<Curso>) cursoRepository.findAll();
    }

    @Autowired
    private usuarioClientRest clientRest;


    @Override
    public Curso save(Curso curso) {
        return cursoRepository.save(curso);
    }
    @Override
    public Optional<Curso> findById(Long id) {
        return cursoRepository.findById(id);
    }
    @Override
    public void deleteById(Long id) {
        cursoRepository.deleteById(id);
    }


    @Override
    public Optional<Student> addUser(Student student, Long id) {
        Optional<Curso> optional = cursoRepository.findById(id);
        if (optional.isPresent()) {
            Student usuarioTemp = clientRest.findById(student.getId());

            Curso curso = optional.get();
            CursoUsuario cursoUsuario = new CursoUsuario();

            cursoUsuario.setUsuarioId(usuarioTemp.getId());

            curso.addCursoUsuario(cursoUsuario);
            cursoRepository.save(curso);
            return Optional.of(usuarioTemp);

        }
        return Optional.empty();
    }
    @Override
    public List<Student> listarEstudiantesPorCurso(Long cursoId) {
        Optional<Curso> cursoOptional = cursoRepository.findById(cursoId);
        if (cursoOptional.isEmpty()) {
            // Puedes lanzar una excepción personalizada aquí si lo prefieres.
            throw new RuntimeException("Curso no encontrado con ID: " + cursoId);
        }

        Curso curso = cursoOptional.get();
        return curso.getCursoUsuarios().stream()
                .map(cursoUsuario -> clientRest.findById(cursoUsuario.getUsuarioId()))
                .collect(Collectors.toList());
    }
}