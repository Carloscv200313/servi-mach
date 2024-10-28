import React from "react";
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Upload,
  Space
} from 'antd';
const Imagenes = () => {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values.upload);
    const fotos = values.upload;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fotos.map((foto: { originFileObj: any; }) => {
      respuesta(foto.originFileObj); // Aquí usamos el archivo real
    });
  };  
  
  const respuesta = async (archivo: string | Blob) => {
    if (archivo) {
      try {
        const form = new FormData();
        form.append("file", archivo); // Añadimos el archivo correctamente
        const response = await fetch("/api/image", {
          method: "POST",
          body: form, // No es necesario establecer el content-type, FormData lo maneja
        });
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      style={{ maxWidth: 200 }}
    >
      <Form.Item
        name="upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="logo" listType="picture">
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 15 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
export default Imagenes;
