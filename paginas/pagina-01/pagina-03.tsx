'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';

export function Pagina03() {
    return (
        <section className="flex min-h-screen items-center justify-center w-full py-20 bg-gray-50">
            <div className="flex items-stretch justify-center w-2/3 space-x-0 shadow-xl">
                {/* Contenedor de la Imagen */}
                <div className="w-1/3 flex justify-center">
                    <Image
                        src="/img/imagen-02.jpg"
                        width={300} // Ajusta el ancho según tus necesidades
                        height={500} // Ajusta la altura para que coincida con la del formulario
                        alt="Background"
                        className="object-cover h-full" // Asegúrate de que la imagen llene el contenedor
                    />
                </div>
                
                {/* Contenedor del Formulario */}
                <div className="w-2/3 bg-white p-8 rounded-lg ">
                    <form className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Regístrate como usuario</h2>
                        <div className="space-y-2">
                            <Label htmlFor="worker-name">Nombre</Label>
                            <Input id="worker-name" placeholder="Nombre completo" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-dni">DNI</Label>
                            <Input id="worker-dni" placeholder="72825562" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-email">Email</Label>
                            <Input id="worker-email" type="email" placeholder="tu@email.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-phone">Teléfono</Label>
                            <Input id="worker-phone" type="tel" placeholder="123456789" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="worker-location">Ubicación</Label>
                            <Input id="worker-location" placeholder="Ciudad, País" required />
                        </div>
                        <Button className="w-full bg-green-600 text-white hover:bg-green-700" type="submit">
                            Registrarse
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    )
}
