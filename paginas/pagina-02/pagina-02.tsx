import Link from "next/link";
import { IconUsers, IconCircleCheck, IconClipboardText } from '@tabler/icons-react';

export default function Pagina02() {
    return (
        <section className="w-full p-14  flex flex-col items-center justify-center bg-white">
            <h2 className="text-3xl font-bold text-center text-black mb-4">
                Pasos para el Trabajador
            </h2>
            <p className="text-center text-gray-600 mb-12">
                Regístrate y encuentra el empleo ideal para ti
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
                {/* Primer paso */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <IconUsers stroke={2} className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-1">Te registras</h3>
                    <p className="text-blue-600">
                        Completar el formulario del Usuario
                    </p>
                </div>
                {/* Segundo paso */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <IconClipboardText stroke={2} className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-1">Confirmación</h3>
                    <p className="text-blue-600">Se le enviará a su correo la confirmación de su nuevo usuario</p>
                </div>
                {/* Tercer paso */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <IconCircleCheck stroke={2} className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-1">Iniciar Sesion</h3>
                    <p className="text-blue-600">Podria iniciar sesion desde {" "}</p>
                    <Link className="text-green-500 hover:underline" href="/login">
                            aquí
                        </Link>
                </div>
            </div>
        </section>
    )
}
