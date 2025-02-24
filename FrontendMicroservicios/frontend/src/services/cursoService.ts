// src/services/cursoService.ts
import type { Student } from "./studentService"; // Importa la interfaz Student

// src/services/cursoService.ts
const API_URL = import.meta.env.VITE_API_URL;

// Definición de la interfaz para un curso
export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
}

// Función para obtener todos los cursos
export async function obtenerCursos(): Promise<Curso[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      console.error(`Error al obtener cursos: ${response.status}`);
      throw new Error(`Error al obtener cursos: ${response.statusText}`);
    }
    const data: Curso[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    throw new Error("Ocurrió un error al obtener los cursos. Por favor, inténtalo de nuevo más tarde.");
  }
}

// Función para obtener un curso por su ID
export async function getCursoById(id: number): Promise<Curso> {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      console.error(`Error al obtener curso con id: ${id}, error: ${response.status}`);
      throw new Error(`Error al obtener curso con id: ${id}, error: ${response.statusText}`);
    }
    const data: Curso = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el curso:", error);
    throw new Error("Ocurrió un error al obtener el curso. Por favor, inténtalo de nuevo más tarde.");
  }
}

// Función para agregar un curso
export async function agregarCurso(cursoData: Omit<Curso, "id">): Promise<Curso> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cursoData),
    });

    if (!response.ok) {
      console.error(`Error al agregar curso: ${response.status}`);
      throw new Error(`Error al agregar curso: ${response.statusText}`);
    }

    const data: Curso = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar un curso:", error);
    throw new Error("Ocurrió un error al agregar el curso. Por favor, inténtalo de nuevo más tarde.");
  }
}

export async function actualizarCurso(id: number, cursoData: Omit<Curso, "id">): Promise<Curso> {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cursoData),
    });

    if (!response.ok) {
      console.error(`Error al actualizar curso: ${response.status}`);
      throw new Error(`Error al actualizar curso: ${response.statusText}`);
    }

    const data: Curso = await response.json();
    return data;
  } catch (error) {
    console.error("Error al actualizar el curso:", error);
    throw new Error("Ocurrió un error al actualizar el curso. Por favor, inténtalo de nuevo más tarde.");
  }
}

// Función para agregar un estudiante a un curso
export const agregarEstudiante = async (cursoId: number, estudiante: any) => {
  try {
    const response = await fetch(`${API_URL}/${cursoId}/estudiantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudiante), // Enviar solo el ID del estudiante
    });

    if (!response.ok) {
      console.error(`Error al agregar estudiante: ${response.status}`);
      throw new Error(`Error al agregar estudiante: ${response.statusText}`);
    }
    const data: Student = await response.json();
    return data;
  } catch (error) {
    console.error("Error al agregar el estudiante:", error);
    throw new Error("Ocurrió un error al agregar el estudiante. Por favor, inténtalo de nuevo más tarde.");
  }
};

export async function eliminarCurso(id: string) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error(`Error al eliminar el curso: ${response.status}`);
      throw new Error(`Error al eliminar el curso: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error al eliminar el curso:", error);
    throw new Error("Ocurrió un error al eliminar el curso. Por favor, inténtalo de nuevo más tarde.");
  }
}

// Función para obtener la lista de estudiantes de un curso
export async function getEstudiantesPorCurso(id: number): Promise<Student[]> {
  try {
    const response = await fetch(`${API_URL}/${id}/estudiantes`);
    if (!response.ok) {
      console.error(`Error al obtener estudiantes del curso: ${response.status}`);
      throw new Error(`Error al obtener estudiantes del curso: ${response.statusText}`);
    }
    const data: Student[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error);
    throw new Error("Ocurrió un error al obtener los estudiantes. Por favor, inténtalo de nuevo más tarde.");
  }
}