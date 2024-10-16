import Image from "next/image"

export default function Pagina01() {
    return (
        <div>
            <section className="w-full min-h-[80vh] py-5 md:py-5 lg:py-5 xl:py-5">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-800">
                                    Conecta con los mejores profesionales, donde y cuando lo necesites!!
                                </h1>
                            </div>
                        </div>
                        <Image
                            alt="Hero"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            height="550"
                            width="550"
                            src="/img/imagen-01.jpg"
                        />
                    </div>
                </div>
            </section>
        </div>
    )

}