import React from 'react';

function HomePage() {
  return (
      <section className="text-center">
          <h1 className="text-4xl font-bold mb-8">Bienvenido a la plataforma</h1>
          <center>
              <img
                  src="https://img.freepik.com/vector-gratis/agregar-ilustracion-concepto-usuario_114360-458.jpg?t=st=1737935863~exp=1737939463~hmac=e27f56bb2f322a109541ae55289e38257980d64c62e5aa24f56a18c794fca245&w=740"
                  alt="fondo"
                  style={{ width: '300px' }}
              />
          </center>
          <p className="text-gray-700 mb-8">
              Explora nuestras funcionalidades de cursos y estudiantes.
          </p>
          <div className="flex justify-center gap-8">
              <a href="/cursos" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Ir a Cursos
              </a>
              <a href="/estudiantes" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                  Ir a Estudiantes
              </a>
          </div>
      </section>
  );
}

export default HomePage;