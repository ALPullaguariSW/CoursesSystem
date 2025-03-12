import React from 'react';
import { Link } from 'react-router-dom';

interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
  creadoEn?: string;
}

interface CursoCardProps {
  curso: Curso;
}

function CursoCard({ curso }: CursoCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{curso.nombre}</h3>
        <p className="mt-2 text-sm text-gray-600">{curso.descripcion}</p>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-between">
        <span className="text-gray-500 text-sm">Créditos: {curso.creditos}</span>
        <div className="space-x-2">
          <Link to={`/cursos/${curso.id}`} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors">
            Detalles
          </Link>
          <Link to={`/cursos/editar/${curso.id}`} className="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors">
            Editar
          </Link>
          <Link to={`/cursos/eliminar/${curso.id}`} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors">
            Eliminar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CursoCard;