import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CursosPage from './pages/CursosPage';
import AgregarCursoPage from './pages/AgregarCursoPage';
import EditarCursoPage from './pages/EditarCursoPage';
import CursoDetallePage from './pages/CursoDetallePage';
import EstudiantesPage from './pages/EstudiantesPage';
import AgregarEstudiantePage from './pages/AgregarEstudiantePage';
import EditarEstudiantePage from './pages/EditarEstudiantePage';
import EstudianteDetallePage from './pages/EstudianteDetallePage';
import EliminarCursoPage from './pages/EliminarCursoPage';
import EliminarEstudiantePage from './pages/EliminarEstudiantePage';
import "./index.css";

function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cursos" element={<CursosPage />} />
                    <Route path="/cursos/agregar-curso" element={<AgregarCursoPage />} />
                    <Route path="/cursos/editar/:id" element={<EditarCursoPage />} />
                    <Route path="/cursos/:id" element={<CursoDetallePage />} />
                    <Route path="/cursos/eliminar/:id" element={<EliminarCursoPage />} />
                    <Route path="/estudiantes" element={<EstudiantesPage />} />
                    <Route path="/estudiantes/agregar-estudiante" element={<AgregarEstudiantePage />} />
                    <Route path="/estudiantes/editar/:id" element={<EditarEstudiantePage />} />
                    <Route path="/estudiantes/:id" element={<EstudianteDetallePage />} />
                    <Route path="/estudiantes/eliminar/:id" element={<EliminarEstudiantePage />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}

export default App;