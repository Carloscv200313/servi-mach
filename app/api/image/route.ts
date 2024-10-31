import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

interface CloudinaryResponse {
    secure_url: string;
}
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.APY_KEY,
    api_secret: process.env.APY_SECRET
});

export async function POST(req: NextRequest) {
    const dato = await req.formData();
    const foto = dato.get('file');

    if (!foto) {
        return NextResponse.json("no se envió imagen");
    }
    if (foto instanceof File) {
        const bytes = await foto.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const response = await new Promise<CloudinaryResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result as CloudinaryResponse);
                }
            }).end(buffer);
        });
        console.log(response.secure_url);
        return NextResponse.json({
            message: "envió imagen",
            url: response.secure_url
        });
    } else {
        return NextResponse.json("el archivo no es un tipo válido");
    }
}
