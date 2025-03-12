import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StudentCard from '../components/StudentCard';
import { obtenerEstudiantes, Student } from '../services/studentService';

function EstudiantesPage() {
    const [estudiantes, setEstudiantes] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const estudiantesData = await obtenerEstudiantes();
                // Asegurarse de que creadoEn siempre tenga un valor
                const estudiantesConCreadoEn = estudiantesData.map(student => ({
                    ...student,
                    creadoEn: student.creadoEn || '' // Asignar un valor por defecto
                }));
                setEstudiantes(estudiantesConCreadoEn);
            } catch (error: any) {
                console.error('Error al obtener estudiantes:', error);
                setErrorMessage(error.message || "No se pudieron cargar los estudiantes.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-700">Lista de Estudiantes</h1>
                <div className="flex gap-3">
                    <Link to="/estudiantes/agregar-estudiante" className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition">
                        ➕ Agregar
                    </Link>
                </div>
            </div>

            {loading ? (
                <p className="text-gray-500 text-center">Cargando estudiantes...</p>
            ) : errorMessage ? (
                <p className="text-red-500 text-center">{errorMessage}</p>
            ) : estudiantes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {estudiantes.map((student) => (
                        <StudentCard key={student.id} student={student} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-center">No hay estudiantes registrados.</p>
            )}
        </div>
    );
}

export default EstudiantesPage;