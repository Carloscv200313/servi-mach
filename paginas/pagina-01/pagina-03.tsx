'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { sendConfirmacion } from '@/utils/brevo_confirmacion';
import { sendEmail } from '@/utils/brevo';
import { CelebrationAnimation } from '@/components/celebration-animation';
export const Pagina03 = () => {
    const [nombre, setnombre] = useState("");
    const [dni, setdni] = useState("");
    const [email, setemail] = useState("");
    const [telefono, settelefono] = useState("");
    const [direccion, setdireccion] = useState("");
    const [cod, setcod] = useState(0);
    const [codigos, setcodigos] = useState("");
    const [currentStep, setCurrentStep] = useState(0);

    const crearUsuario = async () => {
        const userData = { nombre, dni, email, telefono, direccion };
        const resp = await fetch("/api/usuarios", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userData)
        });
        const datos = { nombre, email };
        await sendEmail(datos);
        await resp.json();
        

    };

    const correoConfirmacion = async () => {
        const codigo = Math.floor(100000 + Math.random() * 900000);
        setcod(codigo);
        const valores = { nombre, email, codigo };
        await sendConfirmacion(valores);
    };

    const handleNext = () => {
        if (currentStep === 0) {
            if (!nombre || !dni || !email || !telefono || !direccion) {
                alert("Por favor, complete todos los campos antes de continuar.");
                return;
            }
            correoConfirmacion();
        }
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
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
            case 1:
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
            case 2: // Mensaje de bienvenida
                return (
                    <div className="h-full flex flex-col justify-center items-center">
                        <motion.h1
                            className="text-3xl font-bold text-black mb-6 text-center"
                            initial={{ opacity: 0, y: -50 }} // Estado inicial
                            animate={{ opacity: 1, y: 0 }} // Estado final
                            transition={{ duration: 0.5 }} // Duración de la animación
                        >
                            🎉 Bienvenido a Servimach 🎉
                        </motion.h1>
                        <motion.p
                            className="text-lg text-center"
                            initial={{ opacity: 0, scale: 0.5 }} // Estado inicial
                            animate={{ opacity: 1, scale: 1 }} // Estado final
                            transition={{ duration: 0.5 }} // Duración de la animación
                        >
                            Nos complace informarte que tu registro ha sido exitoso.
                            <br />
                            Puedes iniciar sesión utilizando las credenciales que hemos enviado a tu correo personal.
                            <br />
                            ¡Estamos encantados de tenerte con nosotros!
                            <span role="img" aria-label="confetti" className="text-2xl">
                                🎊🎊🎊
                            </span>
                            <br />
                        </motion.p>

                        <CelebrationAnimation />

                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="flex h-screen items-center justify-center w-full p-5 md:py-10 bg-gradient-to-t from-[#a261ce] to-blue-400">
            <div className="flex items-stretch justify-center h-screen p-10 md:w-3/4">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/2 bg-white/30 p-8 border-4 border-black rounded-3xl flex flex-col justify-between"
                    style={{ minHeight: '450px' }}
                >
                    <form className="space-y-6 flex flex-col justify-between flex-grow overflow-y-auto " onSubmit={async (e) => {
                        e.preventDefault();
                        if (currentStep === 1) {
                            if (Number(codigos) === cod) {
                                await crearUsuario();
                                setCurrentStep(2); // Avanza directamente al paso 2
                            } else {
                                alert("Código incorrecto");
                            }
                        } else {
                            handleNext();
                        }
                    }}>
                        <div className="flex-grow">
                            {renderStepContent()}
                        </div>
                        <div className="flex justify-between w-full mt-4">
                            {currentStep > 0 && currentStep < 2 && (
                                <Button variant="outline" onClick={handleBack} type="button">
                                    Atrás
                                </Button>
                            )}
                            {currentStep < 2 && (
                                <Button className="bg-black text-white hover:bg-green-700 rounded-3xl" type="submit">
                                    {currentStep === 1 ? 'Finalizar' : 'Siguiente'}
                                </Button>
                            )}
                        </div>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="hidden md:flex w-1/3 justify-center"
                >
                    <Image
                        src="/img/imagen.png"
                        width={500}
                        height={500}
                        alt="Background"
                        className="object-cover h-full w-full"
                    />
                </motion.div>
            </div>
        </section>
    );
};

Pagina03.displayName = 'Pagina03';
