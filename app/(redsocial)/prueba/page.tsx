"use client"

import WebCamera from "@/components/Camara";

//import UploadImages from "@/components/Aws_reconocer";
//import Comparacion_Img from "@/components/Comparacion_Img";
//import { CelebrationAnimation } from "@/components/celebration-animation";
//import Imagenes from "@/components/Imagen";

export default function Home() {
    return (
        <div className="bg-yellow-500 gap-36">
            {/** <Imagenes/>*/}
            {/**  <CelebrationAnimation/>*/}
            {/** <Comparacion_Img/>*/}
            {/**<UploadImages/>*/}
            <WebCamera/>
            
        </div>
    );
}
