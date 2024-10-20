'use client'
import { forwardRef } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';

export const Pagina03 = forwardRef<HTMLElement, unknown>((_, ref) => {
    return (
        <section 
            ref={ref}  // Aquí se usa el ref directamente
            className="flex md:min-h-[100vh] items-center justify-center w-full p-5 md:py-10 bg-gradient-to-b from-white to-blue-400"
        >
            <div className="flex items-stretch justify-center md:w-3/4 ">
                {/* Contenedor del Formulario */}
                <div className="w-full md:w-1/2 bg-white/30  p-8 opacity-99 border-4 border-black rounded-3xl">
                    <form className="space-y-6 flex flex-col items-center justify-center">
                        <h2 className="text-3xl font-bold text-black mb-6 text-center ">Regístrate como usuario</h2>
                        <div className=" w-full">
                            <div className="space-y-2">
                                <Label htmlFor="worker-name">Nombre</Label>
                                <Input id="nombre" placeholder="Nombre completo" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="worker-dni">DNI</Label>
                                <Input id="dni" placeholder="72825562" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="worker-email">Email</Label>
                                <Input id="email" type="email" placeholder="tu@email.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="worker-phone">Teléfono</Label>
                                <Input id="telefono" type="tel" placeholder="123456789" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="worker-location">Ubicación</Label>
                                <Input id="direccion" placeholder="Ciudad, País" required />
                            </div>
                        </div>
                        <Button className="w-2/3 bg-black text-white hover:bg-green-700  rounded-3xl" type="submit">
                            Registrarse
                        </Button>
                    </form>
                </div>
                {/* Contenedor de la Imagen */}
                <div className="hidden md:flex w-1/3 justify-center"> {/* Ocultar en pantallas pequeñas */}
                    <Image
                        src="/img/imagen.png"
                        width={50000} // Ajusta el ancho según tus necesidades
                        height={50000} // Ajusta la altura para que coincida con la del formulario
                        alt="Background"
                        className="object-cover h-full w-full" // Asegúrate de que la imagen llene el contenedor
                    />
                </div>
            </div>
        </section>
    );
});

// Hacemos que forwardRef acepte un ref de tipo HTMLElement
Pagina03.displayName = 'Pagina03';
