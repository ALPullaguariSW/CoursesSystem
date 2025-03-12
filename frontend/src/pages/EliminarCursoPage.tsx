import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eliminarCurso } from '../services/cursoService';

function EliminarCursoPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const eliminarYRedirigir = async () => {
            try {
                if (id) {
                    await eliminarCurso(id);
                    alert("Curso eliminado con éxito 🎉");
                } else {
                    alert("ID de curso inválido.");
                }
            } catch (error:any) {
                console.error("Error al eliminar el curso:", error);
                alert(`❌ Error al eliminar curso: ${error.message || 'Error desconocido'}`);
            } finally {
                navigate('/cursos'); // Redirige siempre, incluso si hay un error
            }
        };

        eliminarYRedirigir();
    }, [id, navigate]);

    return (
        <div>
            <p>Eliminando curso...</p>
        </div>
    );
}

export default EliminarCursoPage;