import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { RekognitionClient, CompareFacesCommand } from '@aws-sdk/client-rekognition';
import axios from 'axios';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APY_KEY,
    api_secret: process.env.APY_SECRET
});
// Configuración de AWS Rekognition
const rekognitionClient = new RekognitionClient({ region: 'us-east-2' });

// Función para subir imagen a Cloudinary
// Función para subir imagen a Cloudinary
const uploadImageToCloudinary = async (buffer: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'FOTOS DE RECONOCIMIENTO' },  // Opcional: si quieres especificar una carpeta en Cloudinary
            (err, result) => {
                if (err) {
                    console.error("Error subiendo a Cloudinary:", err); // Log de error
                    reject(err);
                } else {
                    console.log("Subida exitosa a Cloudinary:", result?.secure_url); // Log de éxito
                    resolve(result?.secure_url || '');
                }
            }
        );
        uploadStream.end(buffer);  // Envía el buffer a Cloudinary
    });
};


// Función para descargar imagen desde URL y convertirla a bytes
const getImageBytesFromUrl = async (url: string): Promise<Buffer> => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        console.log("Descarga exitosa desde URL:", url); // Log de éxito
        return Buffer.from(response.data, 'binary');
    } catch (err) {
        console.error("Error descargando imagen desde URL:", url, err); // Log de error
        throw err;
    }
};

// Función para comparar imágenes en AWS Rekognition usando bytes
const compareImagesWithBytes = async (image1Bytes: Buffer, image2Bytes: Buffer) => {
    try {
        const params = {
            SourceImage: { Bytes: image1Bytes },
            TargetImage: { Bytes: image2Bytes },
            SimilarityThreshold: 0,  // Ajusta este valor si necesitas un umbral específico
        };

        const command = new CompareFacesCommand(params);
        const rekognitionResponse = await rekognitionClient.send(command);
        console.log("Respuesta de AWS Rekognition:", rekognitionResponse); // Log de éxito
        return rekognitionResponse;
    } catch (err) {
        console.error("Error comparando imágenes en AWS Rekognition:", err); // Log de error
        throw err;
    }
};

// Método POST para subir imágenes a Cloudinary y comparar en AWS Rekognition
export async function POST(req: NextRequest) {
    try {
        // Extraer datos del formulario
        const dato = await req.formData();
        const foto1 = dato.get('file1');
        const foto2 = dato.get('file2');

        // Verificar si se recibieron las imágenes correctamente
        console.log('Foto1:', foto1, 'Foto2:', foto2);

        if (!foto1 || !foto2) {
            return NextResponse.json({ message: "Ambas imágenes son requeridas" });
        }

        if (foto1 instanceof File && foto2 instanceof File) {
            // Convertir las fotos a buffers
            const bytes1 = Buffer.from(await foto1.arrayBuffer());
            const bytes2 = Buffer.from(await foto2.arrayBuffer());

            // Subir ambas imágenes a Cloudinary
            const imageUrl1 = await uploadImageToCloudinary(bytes1);
            const imageUrl2 = await uploadImageToCloudinary(bytes2);

            console.log('URLs de Cloudinary:', imageUrl1, imageUrl2);

            // Descargar las imágenes desde Cloudinary para convertirlas en bytes
            const image1Bytes = await getImageBytesFromUrl(imageUrl1);
            const image2Bytes = await getImageBytesFromUrl(imageUrl2);

            // Comparar las imágenes usando AWS Rekognition
            const rekognitionResponse = await compareImagesWithBytes(image1Bytes, image2Bytes);

            // Extraer el porcentaje de similitud de la respuesta de AWS Rekognition
            const similarity = rekognitionResponse.FaceMatches?.[0]?.Similarity || 0;

            return NextResponse.json({
                message: "Imágenes comparadas exitosamente",
                cloudinary_urls: { imageUrl1, imageUrl2 },
                similarity: similarity  // Devolver la similitud
            });
        } else {
            return NextResponse.json({ message: "Ambos archivos deben ser válidos" });
        }
    } catch (error) {
        console.error("Error en el proceso completo:", error); // Log de error global
        return NextResponse.json({ message: "Ocurrió un error", error: error });
    }
}
