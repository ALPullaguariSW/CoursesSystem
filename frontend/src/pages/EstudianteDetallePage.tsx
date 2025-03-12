import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEstudianteById, Student } from '../services/studentService';

function EstudianteDetallePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [estudiante, setEstudiante] = useState<Student | null>(null);
    const estudianteId = id ? parseInt(id, 10) : null;

    useEffect(() => {
        if (estudianteId) {
            const fetchEstudiante = async () => {
                try {
                    const estudianteData = await getEstudianteById(estudianteId);
                    setEstudiante(estudianteData);
                } catch (error:any) {
                    console.error("Error al obtener el estudiante:", error);
                    alert(`Error al cargar el estudiante: ${error.message || 'Error desconocido'}`);
                    navigate('/estudiantes');
                }
            };
            fetchEstudiante();
        } else {
            alert("ID de estudiante inválido");
            navigate('/estudiantes');
        }
    }, [id, navigate, estudianteId]);

    if (!estudiante) {
        return <p>Cargando información del estudiante...</p>;
    }

    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-2xl font-bold">{estudiante.nombre} {estudiante.apellido}</h2>
            <p className="text-gray-700">{estudiante.email}</p>
            <p className="text-gray-700">Teléfono: {estudiante.telefono}</p>
        </div>
    );
}

export default EstudianteDetallePage;