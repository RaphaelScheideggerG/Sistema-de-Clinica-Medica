//PacienteForm.jsx
import React from "react";
import { Form, Input, DatePicker, Radio } from "antd";
import TelefoneForm from "./TelefoneForm";
import EmailForm from "./EmailForm";

export default function PacienteForm() {
  // Observa o valor do campo "contatoTipo" no Form
  const contatoTipo = Form.useWatch("contatoTipo") || "Telefone";

  return (
    <>
      <Form.Item
        label="CPF"
        name="cpf"
        rules={[
          { required: true, message: "Informe o CPF!" },
          { len: 11, message: "O CPF deve ter 11 números exatos" }
        ]}
      >
        <Input placeholder="Somente números" maxLength={11} />
      </Form.Item>

      <Form.Item
        label="Data de Nascimento"
        name="dataNascimento"
        rules={[{ required: true, message: "Informe a data de nascimento!" }]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Tipo de Contato"
        name="contatoTipo"
        initialValue="Telefone"
      >
        <Radio.Group>
          <Radio value="Telefone">Telefone</Radio>
          <Radio value="Email">Email</Radio>
        </Radio.Group>
      </Form.Item>

      {contatoTipo === "Telefone" ? <TelefoneForm /> : <EmailForm />}
    </>
  );
}
