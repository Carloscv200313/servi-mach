'use client'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';
import { motion } from 'framer-motion'; // Importa motion
import { sendEmail } from '@/utils/brevo_confirmacion';

export const Pagina03 = () => {
    // Estados para los campos del formulario
    const [nombre, setnombre] = useState("");
    const [dni, setdni] = useState("");
    const [email, setemail] = useState("");
    const [telefono, settelefono] = useState("");
    const [direccion, setdireccion] = useState("");
    const [cod, setcod] = useState(0); // Código numérico de confirmación
    const [codigos, setcodigos] = useState(""); // Código ingresado por el usuario

    // Estado para controlar el paso actual
    const [currentStep, setCurrentStep] = useState(0);

    // Función para manejar la creación de usuario (POST a API)
    const crearUsuario = async () => {
        const userData = { nombre, dni, email, telefono, direccion }; // Crear objeto con los datos actualizados
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

    // Función para enviar el correo de confirmación con el código
    const correoConfirmacion = async () => {
        const codigo = Math.floor(100000 + Math.random() * 900000); // Generar un código de 6 dígitos
        console.log(codigo);
        setcod(codigo); // Guardar el código en el estado
        
        const valores = { nombre, email, codigo }; // Usar los valores actualizados directamente de los estados
        await sendEmail(valores); // Enviar el correo
    };

    // Función para avanzar al siguiente paso
    const handleNext = () => {
        if (currentStep === 0) {
            // Verificar si todos los campos están completos
            if (!nombre || !dni || !email || !telefono || !direccion) {
                alert("Por favor, complete todos los campos antes de continuar.");
                return;
            }

            // Enviar el correo de confirmación y avanzar al siguiente paso
            correoConfirmacion();  // Enviar correo con código de confirmación
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
                        <h2 className="text-3xl font-bold text-black mb-6 text-center">Regístrate como usuario</h2>
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input id="nombre" placeholder="Nombre completo" required value={nombre} onChange={(e) => setnombre(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dni">DNI</Label>
                            <Input id="dni" placeholder="72825562" required value={dni} onChange={(e) => setdni(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setemail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input id="telefono" type="tel" placeholder="123456789" required value={telefono} onChange={(e) => settelefono(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="direccion">Ubicación</Label>
                            <Input id="direccion" placeholder="Ciudad, País" required value={direccion} onChange={(e) => setdireccion(e.target.value)} />
                        </div>
                    </div>
                );
            case 1:  // Paso 2: Confirmación
                return (
                    <div className="h-full">
                        <h2 className="text-3xl font-bold text-black mb-6 text-center">Confirmación</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Nombre:</strong> {nombre}</li>
                            <li><strong>DNI:</strong> {dni}</li>
                            <li><strong>Email:</strong> {email}</li>
                            <li><strong>Teléfono:</strong> {telefono}</li>
                            <li><strong>Ubicación:</strong> {direccion}</li>
                        </ul>
                        <p>¿Los datos son correctos?</p>
                        <p>Ahora corrobora el código que se te envió a tu correo.</p>
                        <div className="space-y-2">
                            <Label htmlFor="codigo">Código</Label>
                            <Input id="codigo" placeholder="123456" required onChange={(e) => setcodigos(e.target.value)} />
                        </div>
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
        <section className="flex h-screen items-center justify-center w-full p-5 md:py-10 bg-gradient-to-t from-[#a261ce] to-blue-400">
            <div className="flex items-stretch justify-center h-screen p-10 md:w-3/4">
                {/* Contenedor del Formulario */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }} // Estado inicial
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }} // Duración de la animación
                    className="w-full md:w-1/2 bg-white/30 p-8 border-4 border-black rounded-3xl flex flex-col justify-between"
                    style={{ minHeight: '450px' }}
                >
                    <form className="space-y-6 flex flex-col justify-between flex-grow" onSubmit={async (e) => {
                        e.preventDefault();  // Prevenir recarga de la página
                        if (currentStep === 2) {
                            await crearUsuario();  // Solo al finalizar el tercer paso
                        }
                        if (currentStep === 1) {
                            // Verificar si el código ingresado coincide con el enviado
                            if (Number(codigos) === cod) {
                                handleNext();  // Avanzar al siguiente paso    
                            } else {
                                alert("Código incorrecto");
                            }
                        }
                        else{
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }} // Estado inicial
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }} // Duración de la animación
                    className="hidden md:flex w-1/3 justify-center"
                >
                    <Image
                        src="/img/imagen.png"
                        width={500} // Ajusta el ancho según tus necesidades
                        height={500} // Ajusta la altura para que coincida con la del formulario
                        alt="Background"
                        className="object-cover h-full w-full" // Asegúrate de que la imagen llene el contenedor
                    />
                </motion.div>
            </div>
        </section>
    );
};

Pagina03.displayName = 'Pagina03';
