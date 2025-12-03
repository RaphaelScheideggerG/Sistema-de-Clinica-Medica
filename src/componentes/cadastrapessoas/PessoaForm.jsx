import React, { useState } from "react";
import { Form, Input, Radio, Button, message, Space, Card } from "antd";
import Paciente from "../../objetos/modelos/Paciente.mjs";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import PacienteForm from "./PacienteForm.jsx";
// Import Medico from "../../objetos/modelos/Medico.mjs"
//import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs"
// import MedicoForm from "./MedicoForm.jsx"

export default function PessoaFormOO() {
  const [form] = Form.useForm();
  const [tipo, setTipo] = useState("Paciente");

  const onChangeTipo = (e) => setTipo(e.target.value);

  const onFinish = async (values) => {
    let pessoa;

    try {
      if (values.tipo === "Paciente") {
        pessoa = new Paciente();
        pessoa.setCPF(values.cpf);
        pessoa.setDataNascimento(values.dataNascimento?.format("DD/MM/YYYY"));

        // Normaliza o contato
        let contatodata = {};
        if (values.contatoTipo === "Telefone") {
          contatodata = {
            tipo: "Telefone",
            contato: values.telefone // aqui vem { ddd, numero }
          };
        } else {
          contatodata = {
            tipo: "Email",
            contato: values.email
          };
        }

        pessoa.setContato(contatodata);

      } else {
        // Instancia médico aqui
      }

      pessoa.setNome(values.nome);

      const dao = values.tipo === "Paciente" ? new PacienteDAO() : new MedicoDAO();
      await dao.salvar(pessoa);

      message.success("Pessoa cadastrada com sucesso!");
      form.resetFields();
      console.log("SUCESSO");
      console.log("values:", values);
      console.log("Pessoa:", pessoa);
    } catch (e) {
      message.error("Erro ao salvar: " + e.message);
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

        <Space direction="vertical" style={{ width: "100%" }}>
          {tipo === "Paciente" && <PacienteForm />}
          <Button type="primary" htmlType="submit" block>
            Salvar
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
