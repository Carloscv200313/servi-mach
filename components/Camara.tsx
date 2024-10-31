import React, { useRef, useState } from 'react';
import { IconCamera } from '@tabler/icons-react';
import Image from 'next/image';

const WebCamera: React.FC = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null); // Para almacenar la imagen capturada
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const toggleCamera = async () => {
        if (isCameraOpen) {
            setImageSrc(null); // Limpiar la imagen anterior al cerrar la cámara
            setIsCameraOpen(false);
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop()); // Detener los tracks de la cámara
            }
        } else {
            setIsCameraOpen(true);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.play(); // Asegúrate de que el video comience a reproducirse
                }
            } catch (error) {
                alert("No se pudo acceder a la cámara.");
                console.error("Error al acceder a la cámara:", error);
            }
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                canvasRef.current.width = videoRef.current.videoWidth;
                canvasRef.current.height = videoRef.current.videoHeight;
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

                // Obtener la imagen como base64
                const dataUrl = canvasRef.current.toDataURL('image/jpeg');
                setImageSrc(dataUrl); // Establece la imagen capturada
                setIsCameraOpen(false); // Cierra la cámara después de tomar la foto
            }
        }
    };

    return (
        <div className='h-full flex flex-col items-center'>
            <h1 className='font-serif font-extrabold text-3xl text-center'>Activar cámara</h1>
            <button
                onClick={toggleCamera}
                className={`mt-4 mb-2 p-2 rounded ${isCameraOpen ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
            >
                {isCameraOpen ? 'Cerrar Cámara' : 'Abrir Cámara'}
            </button>

            {isCameraOpen && (
                <div className='flex flex-col items-center w-full'>
                    <video ref={videoRef} autoPlay className="w-full max-w-md border-2 border-black" />
                    <button onClick={capturePhoto} className='mt-4 p-2 bg-green-500 text-white rounded flex items-center'>
                        <IconCamera stroke={2} className='w-6 h-6 mr-2' />
                        Tomar Foto
                    </button>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
            )}

            {imageSrc && !isCameraOpen && ( // Mostrar imagen solo si la cámara está cerrada
                <div className='mt-4'>
                    <h2 className='text-xl font-bold'>Foto Capturada:</h2>
                    <Image
                        src={imageSrc}
                        alt="Captura"
                        className="w-64 h-auto border-2 border-gray-300 mt-2" // Tamaño de imagen más pequeño
                        width={256} // Ajusta el ancho según sea necesario
                        height={144} // Ajusta la altura según sea necesario
                    />
                </div>
            )}
        </div>
    );
};

export default WebCamera;
