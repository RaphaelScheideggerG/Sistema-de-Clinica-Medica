import React from "react";
import { Form, Input } from "antd";

export default function EmailForm() {
  return (
    <Form.Item
      label="E-mail"
      name="email"
      rules={[
        { required: true, message: "Informe o e-mail!" },
        { type: "email", message: "Formato de e-mail inválido!" }
      ]}
    >
      <Input placeholder="exemplo@dominio.com" />
    </Form.Item>
  );
}
