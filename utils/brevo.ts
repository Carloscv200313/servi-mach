"use server"
import * as brevo from '@getbrevo/brevo'; // Si usas Brevo para el envío

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY as string);
interface Props {
    nombre: string;
    email: string;
}
export async function sendEmail({ nombre, email }: Props) {
    const smtpElmail = new brevo.SendSmtpEmail();
    smtpElmail.subject = `Hola, ${nombre}`;
    smtpElmail.to = [{ email: email, name: nombre }];
    smtpElmail.htmlContent =
    `
    <html>
  <body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;">
    <table style="width: 100%; max-width: 680px; margin: 0 auto; padding: 0; border-spacing: 0; background-color: #ffffff ;">
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
            Hi ${nombre},
          </p>
          <p style="font-size: 16px; line-height: 26px; color: #3c3f44;">
            Bienvenido a Servi-Mach, la nueva plataforma innovadora para conectar a usuarios y empleados.
          </p>
        </td>
      </tr>

      <!-- Botón de "Iniciar Sesión" -->
      <tr>
        <td style="text-align: center;">
          <a href="https://servi-mach.vercel.app/login" 
             style="display: block; background-color: #2b2d6e; color: #fff; font-size: 17px; text-align: center; text-decoration: none; border-radius: 4px; padding: 12px; width: 200px; margin: 20px auto; font-weight: bold;">
            Iniciar Sesión
          </a>
        </td>
      </tr>
      <!-- Separador -->
      <tr>
        <td>
          <hr style="border: 0; border-top: 1px solid #cccccc; margin: 20px 0;" />
        </td>
      </tr>

      <!-- Pie de página con la dirección -->
      <tr>
        <td style="text-align: center;">
          <p style="color: #8898aa; font-size: 12px;">
            470 Noor Ave STE B #1148, Lima - Peru, CA 94080
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>

`;
    smtpElmail.sender = { name: "Servi Mach", email: "2313010492@untels.edu.pe" };

    try {
        const result = await apiInstance.sendTransacEmail(smtpElmail);
        console.log('Email enviado con éxito', result);
    } catch (error) {
        console.error('Error al enviar el correo', error);
    }
}
