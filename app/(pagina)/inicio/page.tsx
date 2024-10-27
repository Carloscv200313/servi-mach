"use client"
import {Pagina01} from "@/paginas/pagina-01/pagina-01";
import {Pagina02} from "@/paginas/pagina-01/pagina-02";
import {Pagina04} from '@/paginas/pagina-01/pagiona-04';
import  {Pagina05}  from '@/paginas/pagina-01/paginas-05';
export default function Home() {
  return (
    <div className="bg-blue-50 ">
      <Pagina01/>
      <Pagina04/>
      <Pagina02 />
      <Pagina05/>
    </div>
  );
}
