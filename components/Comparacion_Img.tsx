import React from "react";
import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Upload,
    Space
} from 'antd';

const Comparacion_Img: React.FC = () => {
    const formItemLayout = {
        wrapperCol: { span: 100 },
    };

    // Manejo del evento del upload
    const normFile = (e: { fileList: unknown; }) => {
        console.log('Upload event:', e.fileList);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // Manejo de la finalización del formulario
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = async (values: any) => {
        console.log('Received values of form: ', values.upload);
        const fotos = values.upload;

        // Verificar que se hayan subido dos imágenes
        if (fotos.length === 2) {
            const formData = new FormData();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fotos.forEach((foto: { originFileObj: any }, index: number) => {
                formData.append(`file${index + 1}`, foto.originFileObj); // Añadir cada archivo con un nombre único
            });

            await enviarComparacion(formData); // Enviar el FormData al backend
        } else {
            console.error('Debes subir exactamente dos imágenes.');
        }
    };

    const enviarComparacion = async (formData: FormData) => {
        try {
            const response = await fetch("http://127.0.0.1:5000", { // Asegúrate de que esta URL sea la correcta
                method: "POST",
                body: formData, // No es necesario establecer el content-type, FormData lo maneja
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const data = await response.json();
            console.log(data); // Manejar la respuesta aquí (por ejemplo, mostrar la similitud)
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    return (
        <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            style={{ maxWidth: 300 }} // Puedes ajustar el tamaño según tus necesidades
        >
            <Form.Item
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Por favor, sube dos imágenes.' }]}
            >
                <Upload name="file" listType="picture" multiple>
                    <Button icon={<UploadOutlined />}>Haz clic para subir</Button>
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 12, offset: 15 }}>
                <Space>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                    <Button htmlType="reset">Restablecer</Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default Comparacion_Img;
