import React, { useRef, useState } from 'react';
import { IconCamera } from '@tabler/icons-react';
import Image from 'next/image';
import { IconTrash } from '@tabler/icons-react';
const WebCamera: React.FC<{ onSimilaritySuccess: (success: boolean) => void }> = ({ onSimilaritySuccess }) => {
    const [image1, setImage1] = useState<File | null>(null); // Para almacenar la imagen subida
    const [image2, setImage2] = useState<File | null>(null); // Para almacenar la imagen capturada
    const [similarity, setSimilarity] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null); // Para almacenar la imagen capturada
    const [previewSrc, setPreviewSrc] = useState<string | null>(null); // Para almacenar la vista previa de la imagen subida
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage1(file);

            // Mostrar vista previa de la imagen
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewSrc(reader.result as string); // Establece la URL de datos como fuente de la imagen
            };
            reader.readAsDataURL(file);
        } else {
            setImage1(null);
            setPreviewSrc(null); // Limpiar vista previa si no hay archivo
        }
    };

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
                canvasRef.current.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
                        setImage2(file); // Establece la imagen capturada
                        setImageSrc(URL.createObjectURL(file)); // Muestra la imagen capturada
                    }
                }, 'image/jpeg');
                setIsCameraOpen(false); // Cierra la cámara después de tomar la foto
            }
        }
    };

    const handleUpload = async () => {
        if (image1 && image2) {
            const formData = new FormData();
            formData.append('file1', image1);
            formData.append('file2', image2);

            try {
                const response = await fetch('/api/aws', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.statusText}`);
                }

                const data = await response.json();
                setSimilarity(data.similarity);
                setErrorMessage(null);

                if (data.similarity >= 99.5) {
                    onSimilaritySuccess(true);  // Notificamos que la similitud es suficiente
                } else {
                    onSimilaritySuccess(false); // Notificamos que no es suficiente
                }
            } catch (error) {
                setErrorMessage('Hubo un error al comparar las imágenes. Intenta de nuevo.');
                console.error('Error en la solicitud:', error);
            }
        } else {
            setErrorMessage('Ambas imágenes son necesarias para la comparación.');
        }
    };

    const removeImage1 = () => {
        setImage1(null);
        setPreviewSrc(null); // Limpiar vista previa si se elimina la imagen
    };

    const removeImage2 = () => {
        setImage2(null);
        setImageSrc(null); // Limpiar imagen capturada si se elimina
    };

    return (
        <>
            <div className={`h-full w-full flex flex-col items-center bg-gray-100 p-4 rounded shadow-md ${isCameraOpen ? 'hidden' : 'flex'}`}>
                <h1 className='font-serif font-extrabold md:text-5xl text-xl  text-center md:m-14 m-5'>
                    Subir la foto de tu DNI y tomarte una foto
                </h1>
                <div className='flex md:flex-row flex-col w-full'>
                    <div className='md:w-1/2 w-full'>
                        <h2 className="md:text-xl text-lg font-bold text-black md:mb-6   text-start">
                            Pautas para tomarse la foto
                        </h2>
                        <ul className="list-disc pl-5 md:space-y-2 space-y-0">
                            <li>No usar gafas</li>
                            <li>No usar gorros</li>
                            <li>Tomar la foto con una buena iluminación</li>
                            <li>Asegurate de tener un fondo blanco</li>
                            <li>Durante la foto, recuerda mantener los ojos abiertos</li>
                        </ul>
                        <input type="file" onChange={handleFileChange} className="mt-4 mb-2" />
                    </div>
                    <div className='md:w-1/2 w-full'>
                        <div className='flex flex-row gap-10 items-center justify-center'>
                            {previewSrc && ( // Mostrar vista previa de la imagen subida
                                <div className='mt-4 flex flex-col items-center'>
                                    <div className="relative">
                                        <Image
                                            src={previewSrc}
                                            alt="Vista Previa"
                                            className="w-72 h-48 border-2 border-gray-300 mt-2 rounded"
                                            width={256}
                                            height={144}
                                        />
                                        <button
                                            onClick={removeImage1}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center "
                                        >
                                            <IconTrash stroke={2} className='text-sm' />
                                        </button>
                                    </div>
                                </div>
                            )}
                            {imageSrc && !isCameraOpen && ( // Mostrar imagen solo si la cámara está cerrada
                                <div className='mt-4 flex flex-col items-center'>
                                    <div className="relative">
                                        <Image
                                            src={imageSrc}
                                            alt="Captura"
                                            className="w-72 h-48 border-2 border-gray-300 mt-2 rounded"
                                            width={256}
                                            height={144}
                                        />
                                        <button
                                            onClick={removeImage2}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center "
                                        >
                                            <IconTrash stroke={2} className='text-sm' />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-row items-center justify-center gap-10 '>
                            <button
                                onClick={toggleCamera}
                                className={`mt-4 mb-2 p-2 rounded bg-blue-500 text-white`}
                            >
                                Abrir Cámara
                            </button>
                            <button 
                                onClick={handleUpload} disabled={!image1 || !image2} 
                                className= {`mt-4 mb-2 p-2  text-white rounded ${ !image1 || !image2 ? 'bg-blue-500':'bg-red-500'} `}>
                                Comparar
                            </button>
                        </div>

                        {similarity !== null && <p className="mt-2">Similitud: {similarity}%</p>}
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    </div>
                </div>
            </div>
            {isCameraOpen && (
                <div className="flex flex-col items-center justify-center h-full w-full">
                    <div className="rounded-full overflow-hidden w-96 h-96 flex justify-center items-center bg-black"> {/* Ajusta el tamaño según sea necesario */}
                        <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
                    </div>
                    <button onClick={capturePhoto} className='mt-4 p-2 bg-green-500 text-white rounded flex items-center'>
                        <IconCamera stroke={2} className='w-6 h-6 mr-2' />
                        Tomar Foto
                    </button>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </div>
            )}

        </>
    );
};

export default WebCamera;
