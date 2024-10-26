'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Pagina03 = () => {
    // Estados para los campos del formulario
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    // Estado para controlar el paso actual
    const [currentStep, setCurrentStep] = useState(0);

    // Datos completos del usuario
    const [userData, setUserData] = useState({
        nombre: "",
        dni: "",
        email: "",
        telefono: "",
        direccion: ""
    });

    // Función para manejar la creación de usuario (POST a API)
    const crearUsuario = async () => {
        const resp = await fetch("/api/usuarios", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData)  // Enviar los datos completos
        });
        const data = await resp.json();
        console.log(data); // Aquí podrías manejar la respuesta de la API
    };

    // Función para avanzar al siguiente paso
    const handleNext = () => {
        if (currentStep === 0) {
            // Guardar los datos llenados en la primera parte del formulario
            setUserData({ nombre, dni, email, telefono, direccion });
        }
        setCurrentStep(currentStep + 1);
    };

    // Función para retroceder al paso anterior
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    // Función para renderizar el contenido según el paso actual
    const renderStepContent = () => {
        switch (currentStep) {
            case 0:  // Paso 1: Datos Personales
                return (
                    <div className="h-full">
                        <h2 className="text-3xl font-bold text-black mb-6 text-center">Regístrate como Trabajador</h2>
                        <div className="space-y-2">
                            <Label htmlFor="worker-name">Nombre</Label>
                            <Input id="nombre" placeholder="Nombre completo" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-dni">DNI</Label>
                            <Input id="dni" placeholder="72825562" required value={dni} onChange={(e) => setDni(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-email">Email</Label>
                            <Input id="email" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-phone">Teléfono</Label>
                            <Input id="telefono" type="tel" placeholder="123456789" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-location">Ubicación</Label>
                            <Input id="direccion" placeholder="Ciudad, País" required value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                        </div>
                    </div>
                );
            case 1:  // Paso 2: Confirmación
                return (
                    <div className="h-full">
                        <h2 className="text-3xl font-bold text-black mb-6 text-center">Confirmación</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Nombre:</strong> {userData.nombre}</li>
                            <li><strong>DNI:</strong> {userData.dni}</li>
                            <li><strong>Email:</strong> {userData.email}</li>
                            <li><strong>Teléfono:</strong> {userData.telefono}</li>
                            <li><strong>Ubicación:</strong> {userData.direccion}</li>
                        </ul>
                        <p>¿Los datos son correctos?</p>
                    </div>
                );
            case 2:  // Paso 3: Subir Foto
                return (
                    <div className="h-full">
                        <h2 className="text-3xl font-bold text-black mb-6 text-center">Subir Foto de Perfil</h2>
                        <Label htmlFor="profilePicture">Foto de perfil</Label>
                        <Input id="profilePicture" type="file" accept="image/*" />
                        <p>Suba una foto de perfil (opcional).</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="flex h-screen items-center justify-center w-full p-5 md:py-10 bg-gradient-to-b from-white to-blue-400">
            <div className="flex items-stretch justify-center h-screen p-10 md:w-3/4">
                {/* Contenedor del Formulario */}
                <motion.div
                    className="w-full md:w-1/2 bg-white/30 p-8 opacity-99 border-4 border-black rounded-3xl flex flex-col justify-between"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ minHeight: '450px' }} 
                >
                    <form className="space-y-6 flex flex-col justify-between flex-grow" onSubmit={async (e) => {
                        e.preventDefault();  // Prevenir recarga de la página
                        if (currentStep === 2) {
                            await crearUsuario();  // Solo al finalizar el tercer paso
                        } else {
                            handleNext();  // Avanzar al siguiente paso
                        }
                    }}>
                        <div className="flex-grow">
                            {renderStepContent()}
                        </div>
                        <div className="flex justify-between w-full mt-4">
                            {currentStep > 0 && (
                                <Button variant="outline" onClick={handleBack} type="button">
                                    Atrás
                                </Button>
                            )}
                            <Button className="bg-black text-white hover:bg-green-700 rounded-3xl" type="submit">
                                {currentStep === 2 ? 'Finalizar' : 'Siguiente'}
                            </Button>
                        </div>
                    </form>
                </motion.div>

                {/* Contenedor de la Imagen */}
                <div className="hidden md:flex w-1/3 justify-center">
                    <Image
                        src="/img/imagen.03.png"
                        width={1000}
                        height={1000}
                        alt="Background"
                        className="object-cover h-full w-full"
                    />
                </div>
            </div>
        </section>
    );
};
