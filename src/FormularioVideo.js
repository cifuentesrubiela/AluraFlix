import React, { useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom"; // Importa Link
import dbData from "./db.json";

const FormularioContainer = styled.div`
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

const SelectCategoria = styled.select`
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const BotonGuardar = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 10px 0;
    border-radius: 5px;
    cursor: pointer;
    flex: 1;
    &:hover {
        background-color: #0056b3;
    }
`;

const FormularioVideo = (props) => {
    const [titulo, actualizarTitulo] = useState("");
    const [linkVideo, actualizarLinkVideo] = useState("");
    const [linkImagen, actualizarLinkImagen] = useState("");
    const [categoria, actualizarCategoria] = useState("");
    const [descripcion, actualizarDescripcion] = useState("");
    const [codigoSeguridad, actualizarCodigoSeguridad] = useState("");

    const manejarEnvioVideo = async (e) => {
        e.preventDefault();
        // Validar campos obligatorios
        if (!titulo || !linkVideo || !categoria) {
            alert("Por favor, complete los campos obligatorios: Título, Enlace del Video y Categoría.");
            return;
        }
        try {
            const datosAEnviar = {
                id: uuidv4(),
                titulo,
                linkVideo,
                linkImagen,
                categoria,
                descripcion,
                codigoSeguridad,
            };

            await axios.post('http://localhost:4000/videos', datosAEnviar);

            limpiarCampos();

            props.registrarVideo(datosAEnviar);
        } catch (error) {
            console.error("Error al crear video:", error);
        }
    };

    const limpiarCampos = () => {
        actualizarTitulo("");
        actualizarLinkVideo("");
        actualizarLinkImagen("");
        actualizarCategoria("");
        actualizarDescripcion("");
        actualizarCodigoSeguridad("");
    };

    return (
        <FormularioContainer>
            <h2>Crear Video</h2>
            <Form>
                <CampoTexto
                    type="text"
                    placeholder="Título del Video"
                    value={titulo}
                    onChange={(e) => actualizarTitulo(e.target.value)}
                />
                <CampoTexto
                    type="text"
                    placeholder="Enlace del Video (URL)"
                    value={linkVideo}
                    onChange={(e) => actualizarLinkVideo(e.target.value)}
                />
                <CampoTexto
                    type="text"
                    placeholder="Enlace de la Imagen (URL)"
                    value={linkImagen}
                    onChange={(e) => actualizarLinkImagen(e.target.value)}
                />
                <SelectCategoria
                    value={categoria}
                    onChange={(e) => actualizarCategoria(e.target.value)}
                >
                    <option value="">Selecciona una categoría</option>
                    {dbData.categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.nombre}>
                            {categoria.nombre}
                        </option>
                    ))}
                </SelectCategoria>
                <CampoTexto
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => actualizarDescripcion(e.target.value)}
                />
                <CampoTexto
                    type="text"
                    placeholder="Código de Seguridad"
                    value={codigoSeguridad}
                    onChange={(e) => actualizarCodigoSeguridad(e.target.value)}
                />
                <Link to="/">Volver a la página principal</Link>
                <Link to="/nueva-categoria">Nueva Categoría</Link>
                <Link to="/" onClick={manejarEnvioVideo}>
                    <BotonGuardar>Guardar</BotonGuardar>
                </Link>
            </Form>
        </FormularioContainer>
    );
};

export default FormularioVideo;
