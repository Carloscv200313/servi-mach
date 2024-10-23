import React from 'react'
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
interface Pagina {
    scroll: () => void;
}
export default function Pagina01({ scroll }: Pagina){
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center w-full p-10 bg-gradient-to-b from-[#62f1de] to-blue-400 gap-10">
            <motion.div
                className='text-center text-4xl md:text-8xl font-extrabold font-sans  text-white '
                initial={{ opacity: 0, x:-100 }} // Estado inicial
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }} // Duración de la animación
            >
                <h1>¿Que conseguiras con <span className='font-mono text-blue-950'>nuestros Servicios?</span></h1>
            </motion.div>
            <motion.div
                className=' text-center text-lg md:text-2xl font-medium font-serif text-white'
                initial={{ opacity: 0, x: 100 }} // Estado inicial
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }} // Duración de la animación
            >
                <h1>Se busca lograr varios beneficios clave tanto para los clientes como para los trabajadores</h1>
            </motion.div>
            <motion.button
                className="bg-white text-[#8c52ff] hover:bg-white/90  font-bold p-3  rounded-3xl text-xl"
                initial={{ opacity: 0, scale: 0.5 }} // Estado inicial
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }} // Duración de la animación
                onClick={scroll}
            >
                Regístrate Ya!!
            </motion.button>
        </div>
    )
}
