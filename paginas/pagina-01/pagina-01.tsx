import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Pagina01() {
    return (
        <>
            <section className="w-full min-h-[60vh] flex flex-row ">
                <div className="w-1/2 flex flex-col  justify-center p-10 ">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-black">
                        Conecta con los mejores profesionales, donde y cuando lo necesites!!
                    </h1>
                    <div className="mt-10">
                        <Button className="bg-turquesa text-white hover:bg-teal-600 text-xl rounded-full py-7" size="lg">
                            Descarga la app
                        </Button>
                    </div>
                </div>
                <div className="w-1/2">
                    <Image
                        alt="Hero"
                        className="w-full  h-full"
                        height="550"
                        width="550"
                        src="/img/imagen-01.jpg"
                    />
                </div>
            </section>
        </>
    )

}