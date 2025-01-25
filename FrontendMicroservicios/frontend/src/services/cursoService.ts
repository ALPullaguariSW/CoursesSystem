const API_URL: string = "http://localhost:8002/api/cursos";
interface Curso {
   id: number,
   nombre: string,
   descripcion: string,
   creditos: number
}
export async function obtenerCursos(): Promise<Curso[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Error al obtener cursos: ${response.status}`);
    }
    return await response.json();
}
export async function getCursoById(id: number): Promise<Curso> {
    const response = await fetch(`${API_URL}/${id}`)
    if(!response.ok){
        throw new Error(`Error al obtener curso con id: ${id} , error: ${response.status}`);
    }
    return await response.json()
}

 