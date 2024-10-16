import Pagina01 from "@/paginas/pagina-01/pagina-01";
import Pagina02 from "@/paginas/pagina-01/pagina-02";


export default function Home() {
  return (
    <div className=" bg-blue-50">
      <main className="flex-1">
        <Pagina01/>
        <Pagina02/>
      </main>
    </div>
  );
}
