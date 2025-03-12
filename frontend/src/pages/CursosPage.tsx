import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CursoCard from '../components/CursoCard';
import { obtenerCursos, Curso } from '../services/cursoService';

function CursosPage() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cursosData = await obtenerCursos();
                setCursos(cursosData);
            } catch (error: any) {
                setError(error.message || 'Error al cargar los cursos.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Lista de Cursos</h1>
                <Link to="/cursos/agregar-curso" className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600">
                    Agregar Curso
                </Link>
            </div>

            {loading ? (
                <p>Cargando cursos...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {cursos.map(curso => (
                        <CursoCard key={curso.id} curso={curso} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default CursosPage;