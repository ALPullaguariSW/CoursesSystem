const API_URL: string = "http://localhost:8003/api/estudiantes";
interface Student {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    telefono: string;
}
// studentService.js

export const obtenerEstudiantes = async () => {
  const response = await fetch('http://localhost:8003/api/estudiantes');
  
  if (response.ok) {
    return await response.json();
  } else {
    console.error('Error al obtener los estudiantes');
    return [];
  }
};

  
export async function getEstudianteById(id: number): Promise<Student> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Error al obtener estudiante con id: ${id}, error: ${response.status}`);
    }

    return await response.json() as Student;
}