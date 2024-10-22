import { redirect } from "next/navigation";

export default function Home() {
    // Redirigimos al usuario al /login
    redirect("/inicio");

    return (
        <div>
            <h1>Redireccionando...</h1>
        </div>
    );
}
