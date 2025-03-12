import axios, { AxiosError } from 'axios';

const API_URL = '/api/estudiantes'; // Sin barra final
const API_URL_PORT  = "http://172.190.36.62:8082/api/estudiantes"; //cambia a tu ip
export interface Student {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    fechaNacimiento: string;
    creadoEn: string;
}

export const obtenerEstudiantes = async (): Promise<Student[]> => {
    try {
        const response = await axios.get<Student[]>(API_URL);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener estudiantes:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al obtener estudiantes: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al obtener los estudiantes.");
        }
    }
};

export const getEstudianteById = async (id: number): Promise<Student> => {
    try {
        const response = await axios.get<Student>(API_URL_PORT+"/"+id);
        return response.data;
    } catch (error: any) {
        console.error(`Error al obtener estudiante con ID ${id}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al obtener el estudiante: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al obtener el estudiante.");
        }
    }
};

export const agregarEstudiante = async (studentData: Omit<Student, 'id' | 'creadoEn'>): Promise<Student> => {
    try {
        const response = await axios.post<Student>(API_URL_PORT, studentData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error: any) {
        console.error("Error al agregar estudiante:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al agregar el estudiante: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al obtener el estudiante.");
        }
    }
};

export const actualizarEstudiante = async (id: number, studentData: Omit<Student, 'id' | 'creadoEn'>): Promise<Student> => {
    try {
        const response = await axios.put<Student>(API_URL_PORT+"/"+id, studentData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error: any) {
        console.error(`Error al actualizar estudiante con ID ${id}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al actualizar el estudiante: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al obtener el estudiante.");
        }
    }
};

export const eliminarEstudiante = async (id: string): Promise<void> => {
    try {
        await axios.delete(API_URL_PORT+"/"+id);
    } catch (error: any) {
        console.error(`Error al eliminar estudiante con ID ${id}:`, error);
        if (axios.isAxiosError(error)) {
            throw new Error(`Error al eliminar el estudiante: ${error.message}`);
        } else {
            throw new Error("Ocurrió un error inesperado al obtener el estudiante.");
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