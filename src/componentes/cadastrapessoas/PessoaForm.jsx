import React, { useState } from "react";
import { Form, Input, Radio, Button, message, Space, Card } from "antd";

import TelefoneForm from "./TelefoneForm";
import EmailForm from "./EmailForm";
import { criarPessoa } from "../../utils/normalizadores.mjs";

import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import PacienteForm from "./PacienteForm.jsx";

import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs"
import MedicoForm from "./MedicoForm.jsx"


export default function PessoaFormOO() {
  const [form] = Form.useForm();
  const [tipo, setTipo] = useState("Paciente");
  const contatoTipo = Form.useWatch("contatoTipo", form) || "Telefone";
  
  const onChangeTipo = (e) => setTipo(e.target.value);

  const onFinish = async (values) => {
    try {
      const pessoa = criarPessoa(values);

      const dao = values.tipo === "Paciente"
        ? new PacienteDAO()
        : new MedicoDAO();

      await dao.salvar(pessoa);

      message.success("Pessoa cadastrada com sucesso!");
      form.resetFields();

      console.log("SUCESSO");
      console.log("values:", values);
      console.log("Pessoa:", pessoa);

    } catch (e) {
      message.error("Erro ao salvar: " + e.message);
      console.log(e)
    }
  };



  return (
    <Card title="Cadastro de Pessoa" style={{ maxWidth: 900, margin: "auto" }}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        
        <Form.Item label="Tipo de Pessoa" name="tipo" initialValue="Paciente">
          <Radio.Group onChange={onChangeTipo}>
            <Radio value="Paciente">Paciente</Radio>
            <Radio value="Medico">Médico</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Informe o nome!" }]}
        >
          <Input placeholder="Nome completo ou razão social" />
        </Form.Item>

        <Form.Item>
          {tipo === "Paciente" ? <PacienteForm /> : <MedicoForm/>}
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
          {contatoTipo === "Telefone" ? <TelefoneForm /> : <EmailForm />}
        </Form.Item>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" block>
            Salvar
          </Button>
        </Space>

      </Form>
    </Card>
  );
}
