
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import Carousel from './Carousel'; // Importa el componente Carousel
import FormularioVideo from './FormularioVideo';
import FormularioCategoria from './FormularioCategoria';
import './App.css';  
import dbData from './db.json';
import background from "./h.jpg"; // Importa la imagen de fondo
import logo from "./aluraflix.png"; // Importa tu logo

function App() {
  const [videos, setVideos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Cargar datos de db.json cuando se monta el componente
  useEffect(() => {
    setVideos(dbData.videos);
    setCategorias(dbData.categorias);
  }, []);

  const registrarVideo = (nuevoVideo) => {
    setVideos([...videos, nuevoVideo]);
  };

  const registrarCategoria = (nuevaCategoria) => {
    setCategorias([...categorias, nuevaCategoria]);
  };

  // Estilo para el div principal con la imagen de fondo
  const divStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  // Estilos para el Navbar
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    width: '100%',
  };

  const logoStyle = {
    width: '120px',
    height: 'auto',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'blue', // Estilo azul para los enlaces
    margin: '0 10px',
  };

  const buttonStyle = {
    textDecoration: 'none',
    color: 'white',
    backgroundColor: 'blue', // Estilo azul brillante para el botón
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <Router>
      <div style={divStyle}>
        {/* Aplica el estilo con la imagen de fondo */}
        <nav style={navStyle}>
          <div>
            <img src={logo} alt="AluraFlix Logo" style={logoStyle} />
          </div>
          <ul>
            <li>
              <Link to="/" style={linkStyle}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/nueva-categoria" style={linkStyle}>
                Nueva Categoría
              </Link>
            </li>
            <li>
              <button style={buttonStyle}>
                <Link to="/nuevo-video" style={{ textDecoration: 'none', color: 'white' }}>
                  Nuevo Video
                </Link>
              </button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {categorias.map((categoria) => (
                  <Carousel key={categoria.id} categoria={categoria} videos={videos} />
                ))}
                <Outlet />
              </div>
            }
          />
          <Route
            path="/nuevo-video"
            // element={<FormularioVideo registrarVideo={registrarVideo} categorias={categorias} />}
            element={<FormularioVideo registrarVideo={registrarVideo} categorias={categorias} redirigirAInicio={() => window.location.href = '/'} />}
          />
          <Route
            path="/nueva-categoria"
            element={<FormularioCategoria registrarCategoria={registrarCategoria} />}
            
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
