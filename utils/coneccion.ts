import sql from "mssql";

interface Configuracion {
    user: string;
    password: string;
    server: string;
    database: string;
    options: {
        encrypt: boolean;
        trustServerCertificate: boolean;
    };
}

// Definir la configuración de conexión
const config: Configuracion = {
    user: process.env.DB_USER || '',        // Usuario de la base de datos
    password: process.env.DB_PASSWORD || '', // Contraseña del usuario
    server: process.env.DB_SERVER || '',    // Nombre del servidor o dirección IP
    database: process.env.DB_DATABASE || '', // Nombre de la base de datos
    options: {
        encrypt: true,                      // Usar encriptación (para Azure SQL)
        trustServerCertificate: true,       // Usar solo si estás conectando localmente
    },
};

let pool: sql.ConnectionPool | null = null;

// Función para conectar a la base de datos
export async function dbConnect() {
    if (!pool) {
        try {
            pool = await sql.connect(config);  // Pasar el objeto config sin tipo explícito
            console.log('Conectado a SQL Server');
        } catch (err) {
            console.error('Error conectando a la base de datos', err);
        }
    }
    return pool;
}
