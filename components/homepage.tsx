'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';

export function Homepage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsModalOpen(!isOpen); // Abre o cierra el modal al togglear el menú
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOpen(false); // Cierra el menú cuando se cierra el modal
  };

  return (
    <div className="flex flex-col h-auto bg-white">
      <header className="px-4 lg:px-10 h-24 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Image
            alt="Hero"
            className="h-32 w-32  object-cover"
            height="300"
            width="300"
            src="/img/fondo.png"
          />
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="block lg:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navegación */}
        <nav className={`hidden lg:flex lg:items-center lg:gap-6 absolute lg:static bg-white lg:bg-transparent top-24 left-0 w-full lg:w-auto z-10`}>
          <Link className="text-lg font-medium hover:text-turquesa transition-colors" href="inicio">
            Usuario
          </Link>
          <Link className="text-lg font-medium hover:text-turquesa transition-colors" href="trabajadores">
            Trabajadores
          </Link>
          <Link className="text-lg font-medium hover:text-turquesa transition-colors" href="asesorias">
            Asesorías
          </Link>
        </nav>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-full h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Menú</h2>
            <ul className="flex flex-col items-center">
              <li className="mb-2">
                <Link href="/" onClick={closeModal} className="text-lg text-blue-600 hover:text-blue-800">Usuario</Link>
              </li>
              <li className="mb-2">
                <Link href="trabajadores" onClick={closeModal} className="text-lg text-blue-600 hover:text-blue-800">Trabajadores</Link>
              </li>
              <li className="mb-2">
                <Link href="asesorias" onClick={closeModal} className="text-lg text-blue-600 hover:text-blue-800">Asesorías</Link>
              </li>
            </ul>
            <Button className="bg-turquesa text-white mt-4 rounded-full" onClick={closeModal}>
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
