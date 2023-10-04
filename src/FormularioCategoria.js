import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'; // Importa Axios

const CategoriaContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CampoTexto = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ColorPicker = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Boton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ListaCategorias = styled.ul`
  list-style: none;
  padding: 0;
`;

const CategoriaItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const EditarCategoria = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #1e7e34;
  }
`;

const RemoverCategoria = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #bd2130;
  }
`;

const FormularioCategoria = (props) => {
  const [nombre, actualizarNombre] = useState('');
  const [color, actualizarColor] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [codigoSeguridad, actualizarCodigoSeguridad] = useState('');

  useEffect(() => {
    // Cargar la lista de categorías al cargar el componente
    const obtenerCategorias = async () => {
      try {
        // Realiza una solicitud GET para obtener las categorías desde el servidor JSON
        const response = await axios.get('http://localhost:4000/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  const manejarEnvioCategoria = async (e) => {
    e.preventDefault();
    try {
      const datosAEnviar = {
        id: uuidv4(),
        nombre,
        color,
        codigoSeguridad,
      };

      // Realiza una solicitud POST para agregar la nueva categoría al servidor JSON
      await axios.post('http://localhost:4000/categorias', datosAEnviar);

      // Restablecer los campos después de enviar el formulario
      actualizarNombre('');
      actualizarColor('');
      actualizarCodigoSeguridad('');

      // Llama a la función 'registrarCategoria' pasada como prop
      props.registrarCategoria(datosAEnviar);
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const eliminarCategoria = async (id) => {
    try {
      // Realiza una solicitud DELETE para eliminar la categoría del servidor JSON
      await axios.delete(`http://localhost:4000/categorias/${id}`);

      // Actualiza el estado con las categorías restantes
      setCategorias(categorias.filter((categoria) => categoria.id !== id));
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
    }
  };

  return (
    <CategoriaContainer>
      <h2>Crear Categoría de Video</h2>
      <Form onSubmit={manejarEnvioCategoria}>
        <CampoTexto
          type="text"
          placeholder="Nombre de la Categoría"
          value={nombre}
          onChange={(e) => actualizarNombre(e.target.value)}
          required
        />
        <ColorPicker
          type="color"
          value={color}
          onChange={(e) => actualizarColor(e.target.value)}
          required
        />
        {/* Campo de código de seguridad */}
        <CampoTexto
          type="text"
          placeholder="Código de Seguridad"
          value={codigoSeguridad}
          onChange={(e) => actualizarCodigoSeguridad(e.target.value)}
          required
        />
        <Boton type="submit">Crear Categoría</Boton>
      </Form>
      <ListaCategorias>
        {categorias.map((categoria) => (
          <CategoriaItem key={categoria.id}>
            <span>{categoria.nombre}</span>
            <div>
              <EditarCategoria>Editar</EditarCategoria>
              <RemoverCategoria onClick={() => eliminarCategoria(categoria.id)}>Remover</RemoverCategoria>
            </div>
          </CategoriaItem>
        ))}
      </ListaCategorias>
    </CategoriaContainer>
  );
};

export default FormularioCategoria;
