import React from 'react';
import { Link } from 'react-router-dom';

interface Student {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  creadoEn?: string;
}

interface StudentCardProps {
  student: Student;
}

function StudentCard({ student }: StudentCardProps) {
  const {
    id = '',
    nombre = '',
    apellido = '',
    email = '',
    telefono = '',
    fechaNacimiento = '',
    creadoEn
  } = student || {};

  const formattedFechaNacimiento = fechaNacimiento
    ? new Date(fechaNacimiento).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Fecha de nacimiento no especificada';

  const formattedCreadoEn = creadoEn
    ? new Date(creadoEn).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })
    : 'Fecha de creación no disponible';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{nombre} {apellido}</h3>
        <p className="mt-1 text-sm text-gray-600">Email: {email}</p>
        <p className="mt-1 text-sm text-gray-600">Teléfono: {telefono}</p>
        <p className="mt-1 text-sm text-gray-600">Nacimiento: {formattedFechaNacimiento}</p>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex items-center justify-end">
        <div className="space-x-2">
          <Link to={`/estudiantes/editar/${id}`} className="inline-block bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors">
            Editar
          </Link>
          <Link to={`/estudiantes/eliminar/${id}`} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-xs transition-colors">
            Eliminar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;