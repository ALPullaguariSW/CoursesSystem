import React from 'react';
import { NavLink} from 'react-router-dom';

interface MainLayoutProps {
    children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Cursos y Estudiantes</title>
      </head>
      <body className="bg-white-100">
        <header className="bg-black text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <NavLink to="/" className="font-bold text-xl">REGISTRO</NavLink>
            <ul className="flex gap-4">
              <li>
                <NavLink to="/cursos" className="hover:underline">Cursos</NavLink>
              </li>
              <li>
                <NavLink to="/estudiantes" className="hover:underline">Estudiantes</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-2">
          {children}
        </main>
        <footer className="bg-gray-200 p-4 text-center mt-8">
          <p>Derechos reservados © 2025</p>
        </footer>
      </body>
    </html>
  );
}

export default MainLayout;