import React from "react";
import { Form, Input } from "antd";

import CRMForm from "./CRMForm";


export default function MedicoForm() {
  return (
    <>
      <Form.Item
        label="Especialidade"
        name="especialidade"
        rules={[{ required: true, message: "Informe a especialidade!" }]}
      >
        <Input placeholder="Ex: Cardiologia" />
      </Form.Item>

      <CRMForm/>

    </>
  );
}
