"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Imagenes = () => {
    const [dato, setDato] = useState<File | null>(null); // Puedes especificar el tipo aquí
    
    useEffect(() => {
        const respuesta = async () => {
            if (dato) {
                try {
                    const form = new FormData();
                    form.append("file", dato);
                    const response = await fetch("/api/image", {
                        method: "POST",
                        body: form,
                    });
                    if (!response.ok) {
                        throw new Error('Error en la respuesta de la API');
                    }
                    const data = await response.json();
                    console.log(data);
                } catch (error) {
                    console.error('Error al realizar la solicitud:', error);
                }
            }
        };

        respuesta();
    }, [dato]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            console.log(file); // Verificar el archivo
            setDato(file); // Actualiza el estado
        }
    };

    return (
        <StyledWrapper>
            <div className="container">
                <div className="folder">
                    <div className="top" />
                    <div className="bottom" />
                </div>
                <label className="custom-file-upload">
                    <input className="title" type="file" onChange={handleFileChange} />
                    Choose a file
                </label>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background: transparent;
    border-radius: 15px;
    height: 50vh;
  }
.folder {
  position: relative;
  animation: float 2.5s infinite ease-in-out;
  transition: transform 0.3s ease;
}

.folder:hover {
  transform: scale(1.05);
}

.folder .top {
  background: linear-gradient(135deg, #ff9a56, #ff6f56);
  width: 80px;
  height: 20px;
  border-radius: 12px 12px 0 0;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 2;
}

.folder .bottom {
  background: linear-gradient(135deg, #ffe563, #ffc663);
  width: 120px;
  height: 80px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-radius: 0 10px 10px 10px;
  position: relative;
  top: -10px;
}

.custom-file-upload {
  font-size: 1.1em;
  color: #ffffff;
  text-align: center;
  margin-top: 20px;
  padding: 15px 25px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background 0.3s ease;
  display: inline-block;
  width: 220px;
}

.custom-file-upload:hover {
  background: rgba(255, 255, 255, 0.4);
}

.custom-file-upload input[type="file"] {
  display: none;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-20px);
  }

  100% {
    transform: translateY(0px);
  }
}

`;

export default Imagenes;
