"use client"
import { CelebrationAnimation } from "@/components/celebration-animation";
import Imagenes from "@/components/Imagen";

export default function Home() {
    return (
        <div className="bg-black ">
            <Imagenes/>
            <CelebrationAnimation/>
        </div>
    );
}
