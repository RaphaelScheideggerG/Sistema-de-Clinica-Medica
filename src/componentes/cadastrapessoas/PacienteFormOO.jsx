import React, { useEffect } from "react";
import { Form, Input, Radio, Button, message, Card } from "antd";
import { useParams } from "react-router-dom";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import Paciente from "../../objetos/modelos/Paciente.mjs";
import PacienteForm from "./PacienteForm.jsx";
import dayjs from "dayjs";

export default function PessoaFormOO() {
  const [form] = Form.useForm();
  const { tipo, id } = useParams();

  useEffect(() => {
    if (id) {
      const dao = tipo === "Paciente" ? new PacienteDAO() : null;
      const pessoa = dao?.listar().find((p) => p.id === id);
      if (pessoa) {
        form.setFieldsValue({
          ...pessoa,
          dataNascimento: pessoa.datanascimento ? dayjs(pessoa.datanascimento) : null,
        });
      }
    }
  }, [id, tipo]);

  const onFinish = async (values) => {
    try {
      const dao = new PacienteDAO();

      const paciente = new Paciente();
      paciente.setNome(values.nome);
      paciente.setCPF(values.cpf);
      paciente.setDataNascimento(values.dataNascimento);

      if (id) {
        dao.atualizar(id, paciente);
        message.success("Registro atualizado com sucesso!");
      } else {
        dao.salvar(paciente);
        message.success("Registro salvo com sucesso!");
      }

      form.resetFields();
      console.log("SUCESSO\n");
      console.log("values:", values, "\n");

    } catch (e) {
      message.error("Erro ao salvar: " + e.message);
    }
  };

  return (
    <Card title="Cadastro de Pessoa" style={{ maxWidth: 900, margin: "auto" }}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={{ tipo: "Paciente" }}
      >
        <Form.Item label="Tipo de Pessoa" name="tipo">
          <Radio.Group>
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

        {tipo === "Paciente" && <PacienteForm />}

        <Button type="primary" htmlType="submit" block>
          Salvar
        </Button>
      </Form>
    </Card>
  );
}
