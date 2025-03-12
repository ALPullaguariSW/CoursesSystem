import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCursoById, actualizarCurso, Curso } from '../services/cursoService';

function EditarCursoPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [creditos, setCreditos] = useState('');
    const cursoId = id ? parseInt(id, 10) : null;

    useEffect(() => {
        if (cursoId) {
            const fetchCurso = async () => {
                try {
                    const curso = await getCursoById(cursoId);
                    setNombre(curso.nombre);
                    setDescripcion(curso.descripcion);
                    setCreditos(curso.creditos.toString());
                } catch (error:any) {
                    console.error("Error al obtener el curso:", error);
                    alert(`Error al cargar el curso: ${error.message || 'Error desconocido'}`);
                    navigate('/cursos');
                }
            };
            fetchCurso();
        } else {
            alert("ID de curso inválido");
            navigate('/cursos');
        }
    }, [id, navigate, cursoId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cursoId) {
            alert("ID de curso inválido");
            return;
        }

        const cursoData: Omit<Curso, 'id'> = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            creditos: parseInt(creditos.trim(), 10),
        };

        try {
            await actualizarCurso(cursoId, cursoData);
            alert("Curso actualizado con éxito 🎉");
            navigate("/cursos");
        } catch (error:any) {
            alert(`❌ Error al actualizar curso: ${error.message || 'Error desconocido'}`);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Editar Curso</h2>

            <form id="editCursoForm" className="space-y-4" onSubmit={handleSubmit} > {/* Elimina method="POST" */}
                <div>
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        required
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="creditos">Créditos</label>
                    <input
                        type="number"
                        id="creditos"
                        name="creditos"
                        required
                        value={creditos}
                        onChange={(e) => setCreditos(e.target.value)}
                    />
                </div>

                <button type="submit" id="submitBtn">
                    Actualizar Curso
                </button>
            </form>
        </div>
    );
}

export default EditarCursoPage;