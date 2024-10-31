'use client';
import { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { sendConfirmacion } from '@/utils/brevo_confirmacion';
import { sendEmail } from '@/utils/brevo';
import { CelebrationAnimation } from '@/components/celebration-animation';
import dynamic from 'next/dynamic';

// Carga diferida del componente
const UploadImages = dynamic(() => import('@/components/Aws_reconocer'), { ssr: false });

export const Pagina03 = () => {
    const [nombre, setNombre] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cod, setCod] = useState(0);
    const [codigos, setCodigos] = useState("");
    const [currentStep, setCurrentStep] = useState(0);
    const [isSimilarityValid, setIsSimilarityValid] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

    const crearUsuario = useCallback(async () => {
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
    }, [nombre, dni, email, telefono, direccion]);

    const correoConfirmacion = useCallback(async () => {
        const codigo = Math.floor(100000 + Math.random() * 900000);
        setCod(codigo);
        const valores = { nombre, email, codigo };
        await sendConfirmacion(valores);
    }, [nombre, email]);

    const handleNext = () => {
        if (currentStep === 0) {
            if (!nombre || !dni || !email || !telefono || !direccion) {
                alert("Por favor, complete todos los campos antes de continuar.");
                return;
            }
            correoConfirmacion().then(() => {
                setCurrentStep(1);
            });
        } else if (currentStep === 2 && !isSimilarityValid) {
            return; // No avanzar si no cumple la similitud
        } else {
            setCurrentStep(currentStep + 1);
        }
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
                            <Input id="nombre" placeholder="Nombre completo" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dni">DNI</Label>
                            <Input id="dni" placeholder="72825562" required value={dni} onChange={(e) => setDni(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="tu@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input id="telefono" type="tel" placeholder="123456789" required value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="direccion">Ubicación</Label>
                            <Input id="direccion" placeholder="Ciudad, País" required value={direccion} onChange={(e) => setDireccion(e.target.value)} />
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
                            <Input id="codigo" placeholder="123456" required onChange={(e) => setCodigos(e.target.value)} />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <section className="flex h-screen items-center justify-center w-full p-5 md:py-10 bg-gradient-to-t from-[#a261ce] to-blue-400">
            <div className={`items-stretch justify-center h-screen p-10 md:w-3/4 ${currentStep < 2 ? 'flex' : 'hidden'}`}>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/2 bg-white/30 p-8 border-4 border-black rounded-3xl flex flex-col justify-between"
                    style={{ minHeight: '450px' }}
                >
                    <form className="space-y-6 flex flex-col justify-between flex-grow overflow-y-auto" onSubmit={async (e) => {
                        e.preventDefault();
                        switch (currentStep) {
                            case 1:
                                if (Number(codigos) === cod) {
                                    handleNext();
                                    return;
                                }
                                break;
                            default:
                                handleNext();
                        }
                    }}>
                        <div className="flex-grow">
                            {renderStepContent()}
                        </div>
                        <div className="flex justify-between w-full mt-4">
                            {currentStep > 0 && currentStep < 3 && (
                                <Button variant="outline" onClick={handleBack} type="button">
                                    Atrás
                                </Button>
                            )}
                            {currentStep < 3 && (
                                <Button className="bg-black text-white hover:bg-green-700 rounded-3xl" type="submit">
                                    {currentStep === 2 ? 'Finalizar' : 'Siguiente'}
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

            {/* Componente de comparación de imágenes */}
            <div className={`bg-transparent h-full w-full ${currentStep === 2 ? 'flex' : 'hidden'} ${showCelebration && 'hidden'}`}>
                <UploadImages onSimilaritySuccess={(success) => {
                    setIsSimilarityValid(success);
                    if (success) {
                        setShowCelebration(true);
                        crearUsuario(); // Muestra el mensaje de celebración si la similitud es alta
                    }
                }} />
            </div>

            {/* Mensaje de celebración */}
            <div className={`h-full flex-col justify-center items-center ${showCelebration ? 'flex' : 'hidden'}`}>
                <motion.h1
                    className="text-3xl font-bold text-black mb-6 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    🎉 Bienvenido a Servimach 🎉
                </motion.h1>
                <motion.p
                    className="text-lg text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
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
                <div className={`${showCelebration ? 'flex' : 'hidden'}`}>
                    <CelebrationAnimation startCelebration={showCelebration} />
                </div>
            </div>
        </section>
    );
};

Pagina03.displayName = 'Pagina03';
