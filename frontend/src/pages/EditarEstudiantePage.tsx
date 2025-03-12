import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEstudianteById, actualizarEstudiante, Student } from '../services/studentService';

function EditarEstudiantePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const estudianteId = id ? parseInt(id, 10) : null;

    useEffect(() => {
        if (estudianteId) {
            const fetchEstudiante = async () => {
                try {
                    const estudiante = await getEstudianteById(estudianteId);
                    setNombre(estudiante.nombre);
                    setApellido(estudiante.apellido);
                    setEmail(estudiante.email);
                    setTelefono(estudiante.telefono);
                    setFechaNacimiento(estudiante.fechaNacimiento);
                } catch (error:any) {
                    console.error("Error al obtener el estudiante:", error);
                    alert(`Error al cargar el estudiante: ${error.message || 'Error desconocido'}`);
                    navigate('/estudiantes');
                }
            };
            fetchEstudiante();
        } else {
            alert("ID de estudiante inválido");
            navigate('/estudiantes');
        }
    }, [id, navigate, estudianteId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!estudianteId) {
            alert("ID de estudiante inválido");
            return;
        }

        const studentData: Omit<Student, 'id' | 'creadoEn'> = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: email.trim(),
            telefono: telefono.trim(),
            fechaNacimiento: fechaNacimiento,
        };

        try {
            await actualizarEstudiante(estudianteId, studentData);
            alert("Estudiante actualizado con éxito 🎉");
            navigate("/estudiantes");
        } catch (error:any) {
            alert(`❌ Error al actualizar estudiante:  ${error.message || 'Error desconocido'}`);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Editar Estudiante</h2>

            <form id="editStudentForm" className="space-y-4" onSubmit={handleSubmit} > {/* Elimina method='PUT' */}
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
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        required
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        required
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        required
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                </div>

                <button type="submit" id="submitBtn">
                    Actualizar Estudiante
                </button>
            </form>
        </div>
    );
}

export default EditarEstudiantePage