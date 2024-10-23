import Image from "next/image";
import { motion } from 'framer-motion'; // Importa motion

export default function Pagina04() {
    return (
        <section className="p-10 max-h-[100vh] flex md:flex-row flex-col items-center justify-center bg-gradient-to-t from-[#4da0b8] to-[#088585] xl:px-32 overflow-hidden">
            <div className="w-full md:w-1/2 h-1/2 flex items-center justify-center mb-10">
                <motion.div
                    initial={{ opacity: 0, x:-100 }} // Estado inicial
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }} // Duración de la animación
                >
                    <Image
                        src="/img/imagen-02.jpg"
                        width={300} // Ajusta el ancho según tus necesidades
                        height={300} // Ajusta la altura según tus necesidades
                        alt="imagen principal"
                        className="rounded-ss-full h-48 w-48 md:h-96 md:w-96 rounded-se-full rounded-ee-full shadow-2xl shadow-[#000000] object-cover" // Asegúrate de que la imagen mantenga su proporción
                    />
                </motion.div>
            </div>
            {/* Sección de texto */}
            <div className="w-full md:w-1/2 h-1/2 p-0 md:p-0 flex flex-col items-center justify-center text-center md:text-end">
                <motion.div
                    className="flex flex-col items-end justify-center"
                    initial={{ opacity: 0, x: 100 }} // Estado inicial
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0 }} // Duración y retraso de la animación
                >
                    <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold mb-4 text-white">
                        {'"Plataforma que conecta trabajadores esenciales'}
                    </h1>
                    <p className="text-2xl md:text-3xl lg:text-3xl mb-6 text-white">
                        {'con clientes, con servicios rápidos y confiables."'}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
