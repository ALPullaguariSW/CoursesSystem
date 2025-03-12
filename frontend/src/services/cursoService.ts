// cursoService.ts
import axios from 'axios';

const API_URL_PORT = "http://172.190.36.62:8081/api/cursos"; //cambia a tu ip y el puerto
const API_URL = '/api/cursos'; // Sin barra final

export interface Curso {
    id: number;
    nombre: string;
    descripcion: string;
    creditos: number;
}

export interface Student {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
}

interface ApiResponse<T> {
    data: T;
}

export const obtenerCursos = async (): Promise<Curso[]> => {
    try {
        const response: ApiResponse<Curso[]> = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener cursos:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al obtener cursos: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al obtener los cursos.");
        }
    }
};

export const getCursoById = async (id: number): Promise<Curso> => {
    try {
        const response: ApiResponse<Curso> = await axios.get(API_URL_PORT+"/"+id);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener curso con ID ${id}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al obtener curso con ID ${id}: ${error.message}`);
        } else {
            throw new Error(`Ocurrió un error inesperado al obtener el curso con ID ${id}.`);
        }
    }
};

export const agregarCurso = async (cursoData: Omit<Curso, 'id'>): Promise<Curso> => {
    try {
        const response: ApiResponse<Curso> = await axios.post(API_URL_PORT,cursoData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al agregar curso:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al agregar curso: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al agregar el curso.");
        }
    }
};

export const actualizarCurso = async (id: number, cursoData: Omit<Curso, 'id'>): Promise<Curso> => {
    try {
        const response: ApiResponse<Curso> = await axios.put(API_URL_PORT+"/"+id, cursoData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar curso con ID ${id}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al actualizar curso con ID ${id}: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al actualizar el curso.");
        }
    }
};

export const eliminarCurso = async (id: string): Promise<void> => {
    try {
        await axios.delete(API_URL_PORT+"/"+id);
    } catch (error) {
        console.error(`Error al eliminar curso con ID ${id}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al eliminar curso con ID ${id}: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al eliminar el curso.");
        }
    }
};

export const getEstudiantesPorCurso = async (cursoId: number): Promise<Student[]> => {
    try {
        const response: ApiResponse<Student[]> = await axios.get(`${API_URL}/${cursoId}/estudiantes`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener estudiantes para el curso ${cursoId}:`, error);
        if (axios.isAxiosError(error)) {
            // Puedes usar el código de estado para manejar diferentes errores.
            if (error.response?.status === 404) {
                throw new Error(`No se encontraron estudiantes para el curso con ID ${cursoId}.`);
            }
            throw new Error(`Error al obtener estudiantes para el curso ${cursoId}: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al obtener los estudiantes.");
        }
    }
};

export const agregarEstudianteACurso = async (cursoId: number, studentId: number): Promise<any> => {
    try {
        const response: ApiResponse<any> = await axios.post(`${API_URL}/${cursoId}/estudiantes`, { id: studentId },  { // este si no se como poner porque pones estudiantes API_URL_PORT"/"cursoId+"/"+id tal vez sea algo asi depende de la llamada en el postman 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al agregar estudiante al curso ${cursoId}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al agregar estudiante al curso ${cursoId}: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al agregar el estudiante.");
        }
    }
};

axios.interceptors.request.use(
    config => {
      console.log('Solicitud Axios:', config);
      return config;
    },
    error => {
      console.error('Error en la solicitud Axios:', error);
      return Promise.reject(error);
    }
);