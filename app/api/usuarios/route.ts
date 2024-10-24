import { NextResponse } from "next/server";
import { dbConnect } from "../../../utils/coneccion";
import sql from "mssql";

export async function POST(req: Request) {
    try {
        // Extraer datos de la solicitud
        const { nombre, dni, email, telefono, direccion } = await req.json();
        // Conectar a la base de datos
        const conex = await dbConnect();
        if (!conex) {
            return NextResponse.json({ error: "No se pudo conectar a la base de datos" }, { status: 500 });
        }
        // Ejecutar la consulta
        const result = await conex
            .request()
            .input("nombre", sql.NVarChar(50), nombre)
            .input("dni", sql.NVarChar(50), dni)
            .input("email", sql.NVarChar(50), email)
            .input("telefono", sql.NVarChar(50), telefono)
            .input("direccion", sql.Text, direccion)  // Asegúrate de que el nombre de la columna sea correcto
            .query("INSERT INTO usuarios (nombre, dni, email, telefono, direccion) VALUES (@nombre, @dni, @email, @telefono, @direccion)");
        
        // Respuesta de éxito
        return NextResponse.json({ message: "Usuario creado con éxito", data: result });
    
    } catch (error) {
        // Manejo de errores
        console.error("Error en la API:", error);
        return NextResponse.json({ error: "Ocurrió un error al crear el usuario" }, { status: 500 });
    }
}

export  async function GET() {
    const conex= await dbConnect();
    const result = await conex?.request().query("SELECT * FROM  usuarios")
    return NextResponse.json(result?.recordset)
}