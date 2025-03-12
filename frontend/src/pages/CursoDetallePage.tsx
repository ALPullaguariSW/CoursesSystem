import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCursoById, getEstudiantesPorCurso, agregarEstudianteACurso, Curso, Student } from '../services/cursoService';

function CursoDetallePage() {
    const { id } = useParams<{ id: string }>();
    const [curso, setCurso] = useState<Curso | null>(null);
    const [estudiantes, setEstudiantes] = useState<Student[]>([]);
    const [studentId, setStudentId] = useState('');
    const navigate = useNavigate();
    const cursoId = id ? parseInt(id, 10) : null;

    useEffect(() => {
        if (cursoId) {
            const fetchCurso = async () => {
                try {
                    const cursoData = await getCursoById(cursoId);
                    setCurso(cursoData);

                    const estudiantesData = await getEstudiantesPorCurso(cursoId);
                    setEstudiantes(estudiantesData);
                } catch (error: any) {
                    console.error("Error al obtener el curso o los estudiantes:", error);
                    alert(`Error al cargar el curso y los estudiantes: ${error.message || 'Error desconocido'}`);
                    navigate('/cursos');
                }
            };

            fetchCurso();
        }
    }, [id, navigate, cursoId]);

    const agregarEstudianteAlCurso = async () => {
        if (!cursoId) {
            alert("ID del curso inválido.");
            return;
        }

        if (!studentId) {
            alert("Por favor, introduce el ID del estudiante.");
            return;
        }

        const studentIdNumber = parseInt(studentId, 10);
        if (isNaN(studentIdNumber)) {
            alert("ID del estudiante inválido.");
            return;
        }

        try {
            await agregarEstudianteACurso(cursoId, studentIdNumber);
            alert('Estudiante agregado exitosamente');
            // Recargar la lista de estudiantes
            const estudiantesData = await getEstudiantesPorCurso(cursoId);
            setEstudiantes(estudiantesData);
        } catch (error:any) {
            console.error("Error al agregar estudiante:", error);
            alert(`Error al agregar estudiante:  ${error.message || 'Error desconocido'}`);
        }
    };

    if (!curso) {
        return <p>Cargando información del curso...</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-2xl font-bold">{curso?.nombre}</h2>
            <p className="text-gray-700">{curso?.descripcion}</p>
            <p className="text-gray-700">Créditos: {curso?.creditos}</p>

            <h3 className="text-xl font-semibold mt-4">Estudiantes</h3>
            {estudiantes.length > 0 ? (
                <ul>
                    {estudiantes.map((estudiante) => (
                        <li key={estudiante.id} className="py-2 border-b border-gray-200">
                            {estudiante.nombre} {estudiante.apellido} ({estudiante.email})
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No hay estudiantes inscritos en este curso.</p>
            )}

            <h3 className="text-xl font-semibold mt-4">Agregar estudiante</h3>
            <div id="agregarEstudianteForm">
                <label htmlFor="studentId">ID del estudiante:</label>
                <input
                    type="number"
                    id="studentId"
                    name="studentId"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                />
                <button type="button" onClick={agregarEstudianteAlCurso}>Agregar</button>
            </div>
        </div>
    );
}

export default CursoDetallePage;