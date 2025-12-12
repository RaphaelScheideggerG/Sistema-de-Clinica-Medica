import React, { useEffect } from "react";
import { Form, Card, message, Button, Radio, Input, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs";

import PacienteForm from "./PacienteForm.jsx";
import MedicoForm from "./MedicoForm.jsx";
import TelefoneForm from "./TelefoneForm.jsx";
import EmailForm from "./EmailForm.jsx";

import { criarPessoa } from "../../utils/normalizadores.mjs";

export default function EditaPessoa() {
  const { tipo, id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  

  const dao = tipo === "Paciente" ? new PacienteDAO() : new MedicoDAO();

  const contatoTipo = Form.useWatch("contatoTipo", form) || "Telefone";

  useEffect(() => {
    const lista = dao.listar();
    const pessoa = lista.find((p) => p.id === id);

    if (!pessoa) {
      message.error("Registro não encontrado");
      navigate("/lista");
      return;
    }

    form.setFieldsValue({
      ...pessoa,
      dataNascimento: pessoa.dataNascimento ? dayjs(pessoa.dataNascimento) : null,
      contatoTipo: pessoa.contato.tipo,
      telefone:
        pessoa.contato.tipo === "Telefone"
          ? pessoa.contato.contato
          : undefined,
      email:
        pessoa.contato.tipo === "Email"
          ? pessoa.contato.contato
          : undefined,
    });
  }, [id]);

  const onFinish = (values) => {
    console.log(values);
    const pessoaAtualizada = criarPessoa(values, tipo);
    dao.atualizar(id, pessoaAtualizada);

    message.success("Registro atualizado com sucesso!");
    navigate("/pessoas");
  };

  return (
    <Card title={`Editar ${tipo}`} style={{ maxWidth: 900, margin: "auto" }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>

        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Informe o nome!" }]}
        >
          <Input placeholder="Nome completo" />
        </Form.Item>

        <Form.Item>
          {tipo === "Paciente" ? <PacienteForm /> : <MedicoForm />}
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

        <Form.Item>
          {contatoTipo === "Telefone" ? <TelefoneForm /> : <EmailForm />}
        </Form.Item>

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" block>
            Salvar Alterações
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
