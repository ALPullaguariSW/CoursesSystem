const API_URL: string = "http://localhost:8003/api/estudiantes";
interface Student {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    fechaNacimiento: string;
    telefono: string;
}
export async function obtenerEstudiantes(): Promise<Student[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error al obtener estudiantes: ${response.status}`);
  }
  return await response.json() as Student[];
}

export async function getEstudianteById(id: number): Promise<Student> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      throw new Error(`Error al obtener estudiante con id: ${id}, error: ${response.status}`);
    }

    return await response.json() as Student;
}