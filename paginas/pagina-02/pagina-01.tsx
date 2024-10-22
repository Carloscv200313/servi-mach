"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Pagina {
    scroll: (id: string) =>void ;
}
export default function Pagina01({ scroll }: Pagina) {
    return (
        <div className="max-h-[100vh] flex items-center justify-center bg-gradient-to-b from-[#8f67df] to-[#62e9e9] p-8 xl:px-32">
            <div className="bg-transparent border-8 border-white rounded-3xl shadow-lg p-8 w-full h-full flex flex-col md:flex-row ">
                {/* Sección de texto */}
                <div className="w-full md:w-1/2 lg:w-2/3 p-0 md:p-8 flex flex-col items-start justify-between">
                    <div className="flex flex-col items-start justify-center ">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-white">
                            Las mejores prupuestas de trabajo 
                        </h1>
                        <p className="text-2xl md:text-4xl lg:text-4xl mb-6 text-white">
                            donde y cuando lo necesites!!
                        </p>
                    </div>
                    <Button
                        className="bg-white text-[#8c52ff] hover:bg-white/90 font-bold py-4 px-6 rounded-3xl text-xl"
                        onClick={() => scroll("seccion")}>
                        Regístrate
                    </Button>

                </div>
                {/* Sección de imagen */}
                <div className="w-full md:w-1/2 lg:w-1/3 flex items-center justify-center  m-0 md:-mt-24">
                    <Image
                        src="/img/personas.01.png"
                        width={40000}
                        height={2000}
                        alt="imagen principal"
                        className="md:block hidden h-full w-auto object-cover p-0 m-0"
                    />
                </div>
            </div>
        </div>
    );
}
