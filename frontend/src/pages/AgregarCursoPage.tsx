// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarEstudiante } from '../services/studentService';

function AgregarEstudiantePage() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const studentData = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: email.trim(),
            telefono: telefono.trim(),
            fechaNacimiento: fechaNacimiento,
        };

        try {
            await agregarEstudiante(studentData);
            alert("Estudiante agregado con éxito 🎉");
            navigate("/estudiantes");
        } catch (error) {
            alert(`❌ Error al agregar estudiante: ${error.message || 'Error desconocido'}`);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Agregar Estudiante</h2>

            <form id="studentForm" className="space-y-4" onSubmit={handleSubmit} >
                <div className="flex flex-col">
                    <label htmlFor="nombre" className="font-semibold">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        className="border rounded-lg p-2 w-full"
                        required
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="apellido" className="font-semibold">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        className="border rounded-lg p-2 w-full"
                        required
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="border rounded-lg p-2 w-full"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="telefono" className="font-semibold">Teléfono</label>
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        className="border rounded-lg p-2 w-full"
                        required
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="fechaNacimiento" className="font-semibold">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="fechaNacimiento"
                        name="fechaNacimiento"
                        className="border rounded-lg p-2 w-full"
                        required
                        value={fechaNacimiento}
                        onChange={(e) => setFechaNacimiento(e.target.value)}
                    />
                </div>

                <button type="submit" id="submitBtn" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-blue-700 transition">
                    Agregar Estudiante
                </button>
            </form>
        </div>
    );
}

export default AgregarEstudiantePage