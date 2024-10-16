'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image';

export function Homepage() {
  return (
    <div className="flex flex-col h-auto bg-blue-50">
      <header className="px-4 lg:px-10 h-24 flex items-center justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Image
            alt="Hero"
            className="h-32 w-32 rounded-full object-cover"
            height="300"
            width="300"
            src="/img/fondo.png"
          />
        </Link>
        <nav className="flex gap-4 sm:gap-6 justify-center items-center flex-grow">
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="/">
            Usuario
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="trabajadores">
            Trabajadores
          </Link>
          <Link className="text-sm font-medium hover:text-blue-600 transition-colors" href="asesorias">
            Asesorías
          </Link>
        </nav>
        <div className="flex items-center justify-center gap-4">
          <Button className="bg-blue-600 text-white hover:bg-blue-700" size="sm">
            Registrate
          </Button>
        </div>
      </header>
    </div>
  )
}
