'use client'
import { useRef } from 'react';
import Pagina01 from "@/paginas/pagina-01/pagina-01";
import Pagina02 from "@/paginas/pagina-01/pagina-02";
import { Pagina03 } from "@/paginas/pagina-01/pagina-03";
import Pagina04 from '@/paginas/pagina-01/pagiona-04';
import  Paginas05  from '@/paginas/pagina-01/paginas-05';

export default function Home() {
  // Crear referencia para la página 03
  const pagina03Ref = useRef<HTMLElement | null>(null);

  // Función para hacer scroll hacia Pagina03
  const scrollToPagina03 = () => {
    if (pagina03Ref.current) {
      pagina03Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-blue-50 ">
      {/* Pasamos la función scroll a Pagina01 */}
      <Pagina01 scroll={scrollToPagina03} />
      <Pagina04/>
      <Pagina02 />
      <Paginas05 scroll={scrollToPagina03}/>
      <Pagina03 ref={pagina03Ref} /> {/* Referencia a Pagina03 */}
      
    </div>
  );
}
