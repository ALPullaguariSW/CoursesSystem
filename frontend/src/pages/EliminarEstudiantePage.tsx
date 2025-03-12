import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eliminarEstudiante } from '../services/studentService';

function EliminarEstudiantePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const eliminarYRedirigir = async () => {
            try {
                if (id) {
                    await eliminarEstudiante(id);
                    alert("Estudiante eliminado con éxito 🎉");
                } else {
                    alert("ID de estudiante inválido.");
                }
            } catch (error:any) {
                console.error("Error al eliminar el estudiante:", error);
                alert(`❌ Error al eliminar estudiante: ${error.message || 'Error desconocido'}`);
            } finally {
                navigate('/estudiantes'); // Redirige siempre, incluso si hay un error
            }
        };

        eliminarYRedirigir();
    }, [id, navigate]);

    return (
        <div>
            <p>Eliminando estudiante...</p>
        </div>
    );
}

export default EliminarEstudiantePage;