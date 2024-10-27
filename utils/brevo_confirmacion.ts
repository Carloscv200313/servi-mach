"use server";
import * as brevo from "@getbrevo/brevo"; // Si usas Brevo para el envío

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string);

interface Props {
  nombre: string;
  email: string;
  codigo: number;
}

export async function sendConfirmacion({ nombre, email, codigo }: Props) {
  if (!email) {
    console.error("El campo de correo electrónico está vacío.");
    return;
  }

  // Crear objeto de email
  const smtpEmail = new brevo.SendSmtpEmail();
  smtpEmail.subject = `Correo de Confirmacion`;
  smtpEmail.to = [{ email: email, name: nombre }]; // Verifica que `email` tenga un valor válido
  smtpEmail.sender = { name: "Servi Mach", email: "2313010492@untels.edu.pe" }; // Correo del remitente

  smtpEmail.htmlContent = `
  <html>
    <body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;">
      <table style="width: 100%; max-width: 680px; margin: 0 auto; padding: 0; border-spacing: 0; background-color: #ffffff;">
        
        <!-- Cabecera con fondo azul y el título grande -->
        <tr>
          <td style="background-color: #2b2d6e; padding: 30px; text-align: center; border-radius: 5px 5px 0 0;">
            <div style="font-size: 48px; font-weight: bold; color: white;">
              Servi<span style="color: #4fd1c5;">Mach</span>
            </div>
            <p style="color: #ffffff; font-size: 20px; margin: 10px 0;">
              Plataforma innovadora para el servicio entre los usuarios y empleados
            </p>
          </td>
        </tr>

        <!-- Contenido principal -->
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 18px; line-height: 26px; color: #3c3f44;">
              Hola, ${nombre}
            </p>
            <p style="font-size: 16px; line-height: 26px; color: #3c3f44; margin-bottom: 14px;">
              Bienvenido a <strong>Servi-Mach</strong>, la plataforma que conecta a
              usuarios y empleados. Usa el siguiente código de verificación cuando
              se te solicite para completar el proceso de registro.
            </p>
          </td>
        </tr>

        <!-- Sección del código de verificación -->
        <tr>
          <td style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; font-weight: bold; color: #3c3f44; margin: 0;">
              Código de verificación
            </p>
            <p style="font-size: 36px; font-weight: bold; color: #3c3f44; margin: 10px 0;">
              ${codigo}
            </p>
            <p style="font-size: 14px; color: #3c3f44; margin: 0;">
              (Este código es válido por 10 minutos)
            </p>
          </td>
        </tr>
        <!-- Separador -->
        <tr>
          <td>
            <hr style="border: 0; border-top: 1px solid #cccccc; margin: 20px 0;" />
          </td>
        </tr>

        <!-- Pie de página -->
        <tr>
          <td style="text-align: center;">
            <p style="font-size: 12px; color: #8898aa;">
              470 Noor Ave STE B #1148, Lima - Peru, CA 94080
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;

  try {
      await apiInstance.sendTransacEmail(smtpEmail);

  } catch (error) {
    console.error("Error al enviar el correo", error);
  }
}
