import Pagina01 from "@/paginas/pagina-01/pagina-01";
import Pagina02 from "@/paginas/pagina-01/pagina-02";
import { Pagina03 } from "@/paginas/pagina-01/pagina-03";

export default function Home() {
  return (
    <div className=" bg-blue-50">
        <Pagina01/>
        <Pagina02/>
        <Pagina03/>
    </div>
  );
}
