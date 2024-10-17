import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Pagina01() {
    return (
        <section className="relative w-full  min-h-[50vh] md:min-h-[30vh] flex flex-col md:flex-row">
            
            {/* Contenedor de texto y botón para pantallas grandes */}
            <div className="w-full md:w-1/2  flex-col justify-center p-10 text-center md:text-left md:relative md:z-10 md:opacity-100 md:block hidden">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-black">
                    Conecta con los mejores profesionales, donde y cuando lo necesites!!
                </h1>
                <div className="mt-10">
                    <Button className="bg-turquesa text-white hover:bg-teal-600 text-xl rounded-full py-7" size="lg">
                        Descarga la app
                    </Button>
                </div>
            </div>
            {/* Contenedor de la imagen */}
            <div className="w-full md:w-1/2 relative"> {/* Cambiado a w-full para pantallas pequeñas */}
                <Image
                    alt="Hero"
                    className="object-cover w-full min-h-[50vh]  md:min-h-[39vh] lg:min-h-[65vh]"
                    height={1000}
                    width={1000}
                    src="/img/imagen-01.jpg"
                />
                {/* Filtro de oscurecimiento */}
                <div className="absolute inset-0 bg-black opacity-50 md:hidden"></div> {/* Solo en pantallas pequeñas */}
                {/* Contenedor de texto y botón para pantallas pequeñas */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4 md:hidden">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                        Conecta con los mejores profesionales, donde y cuando lo necesites!!
                    </h1>
                    <div className="mt-10">
                        <Button className="bg-turquesa text-white hover:bg-teal-600 text-xl rounded-full py-3" size="lg">
                            Descarga la app
                        </Button>
                    </div>
                </div>
            </div>

        </section>
    );
}
