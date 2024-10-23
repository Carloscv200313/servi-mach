import Link from "next/link";
import { IconUnlink, IconCircleCheck, IconClipboardText, Icon12Hours } from '@tabler/icons-react';
import { motion } from 'framer-motion';

export default function Pagina02() {
    const pasos = [
        { titulo: "Te registras", desc: "Completar el formulario del Usuario", link: "", icono: <IconClipboardText stroke={2} className="h-14 w-14 text-blue-800" /> },
        { titulo: "Esperar registro", desc: "Se validará su información", link: "", icono: <Icon12Hours stroke={2} className="h-14 w-14 text-orange-500" /> },
        { titulo: "Confirmación", desc: "Se le enviará un correo de confirmación", link: "", icono: <IconCircleCheck stroke={2} className="h-14 w-14 text-green-500" /> },
        { titulo: "Iniciar Sesión", desc: "Podría iniciar sesión desde", link: <Link className="text-red-500 hover:underline" href="/login">aquí</Link>, icono: <IconUnlink stroke={2} className="h-14 w-14 text-red-600" /> },
    ];

    return (
        <section className="w-full p-14 flex flex-col items-center justify-center bg-gradient-to-t from-[#62f1de] to-[#4da0b8]">
            <motion.div
                initial={{ opacity: 0, y: 100 }} // Estado inicial
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }} // Duración de la animación
            >
                <h2 className="text-5xl md:text-7xl font-bold text-center text-white mb-4">
                    Pasos para el Usuario
                </h2>
                <p className="text-center text-lg md:text-2xl text-white mb-12">
                    Regístrate y encuentra el empleo ideal para ti
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-20 w-8/12 md:w-11/12">
                {pasos.map((paso, index) => (
                    <motion.div
                        key={paso.titulo}
                        className="flex flex-col items-center w-full text-center border-4 border-teal-800 rounded-3xl py-9 px-4 bg-white/20"
                        initial={{ opacity: 0, y: 100 }} // Estado inicial
                        whileInView={{ opacity: 1, y: 0 }} // Animación cuando está en vista
                        transition={{ duration: 0.5, delay: index * 0.2 }} // Retraso basado en el índice
                    >
                        <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-2">
                            {paso.icono}
                        </div>
                        <h3 className="text-2xl font-semibold text-blue-800 mb-1">{paso.titulo}</h3>
                        <p className="text-lg text-blue-600">
                            {paso.desc} {paso.link}
                        </p>
                        
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
