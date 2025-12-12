import React, { useState } from "react";
import { Form, Input, Radio, Button, message, Space, Card } from "antd";

import TelefoneForm from "./TelefoneForm";
import EmailForm from "./EmailForm";

import PacienteForm from "./PacienteForm.jsx";

import MedicoForm from "./MedicoForm.jsx"

export default function PessoaForm({ type, contatoType }) {
  
  return (
    <>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Informe o nome!" }]}
        >
          <Input placeholder="Nome completo ou razão social" />
        </Form.Item>

        <Form.Item>
          {type === "Paciente" ? <PacienteForm /> : <MedicoForm/>}
        </Form.Item>

        <Form.Item
        label="Tipo de Contato"
        name="contatoTipo"
        initialValue="Telefone">
          <Radio.Group>
            <Radio value="Telefone">Telefone</Radio>
            <Radio value="Email">Email</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          {contatoType === "Telefone" ? <TelefoneForm /> : <EmailForm />}
        </Form.Item>

    </>
  );
}
