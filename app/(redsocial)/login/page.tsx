import React from 'react';
const Home: React.FC = () => {
    return (
        <>
            <section className="min-h-screen flex items-stretch text-white w-screen">
                {/* Fondo de imagen para pantallas grandes */}
                <div
                    className="lg:flex  h-screen hidden bg-black bg-no-repeat bg-cover relative items-center w-1/2 "
                    style={{
                        backgroundImage: 'url("img/imagen-02.jpg")',
                        backgroundPosition: 'center', // Centra la imagen
                        backgroundSize: 'cover', // Asegúrate de que la imagen cubra todo el área
                    }}
                >
                    <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                </div>
                {/* Formulario de inicio de sesión */}
                <div className="lg:w-1/2  flex items-center justify-center text-center md:px-16 p-10 z-0 bg-neutral-800 w-full ">
                    <div
                        className="flex items-center justify-center text-center  px-0 z-0 bg-neutral-800 w-full h-full border-4 border-turquesa rounded-3xl m-16"
                    >
                        <div
                            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
                            style={{
                                backgroundImage: 'url("img/imagen-02.jpg")',
                                backgroundPosition: 'center', // Centra la imagen
                                backgroundSize: 'cover', // Asegúrate de que la imagen cubra todo el área
                            }}
                        >
                            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                        </div>
                        <div className="md:w-full w-screen h-full z-20 flex flex-col items-center justify-center ">
                            {/*<Image 
                            src="/img/logo_SF.png" 
                            alt={'Logo de Servi-Mach'}
                            width={200}
                            height={500}/>*/}
                            <p className='text-5xl font-bold font-sans mb-10'> Servi <span className=' text-turquesa'>Mach</span></p>
                            <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto ">
                                <div className="pb-2 pt-4">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Usuario"
                                        className="block w-full p-2 text-lg text-black bg-white rounded-xl"
                                    />
                                </div>
                                <div className="pb-2 pt-4">
                                    <input
                                        className="block w-full p-2 text-lg text-black bg-white rounded-xl"
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="******"
                                    />
                                </div>
                                <div className="mt-12 flex justify-center">
                                    <button className="uppercase block w-2/3 p-2 text-xl rounded-xl border-2 border-turquesa bg-black hover:bg-turquesa focus:outline-none  font-semibold text-white">
                                        Iniciar Sesion
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
