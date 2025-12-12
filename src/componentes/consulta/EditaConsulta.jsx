import React, { useEffect } from "react";
import { Form, Card, message, Button, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import ConsultaDAO from "../../objetos/dao/ConsultaDAO.mjs";
import ConsultaForm from "./ConsultaForm.jsx";
import { criarConsulta } from "../../utils/normalizadores.mjs";

export default function EditaConsulta() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dao = new ConsultaDAO();

  useEffect(() => {
    const lista = dao.listar();
    const consulta = lista.find((c) => c.id === id);

    if (!consulta) {
      message.error("Consulta não encontrada");
      navigate("/consultas");
      return;
    }

    form.setFieldsValue({
      ...consulta,
      data: consulta.data ? dayjs(consulta.data) : null,
    });
  }, [id]);

  const onFinish = (values) => {
    const consultaAtualizada = criarConsulta(values);
    consultaAtualizada.id = id;

    dao.atualizar(id, consultaAtualizada);

    console.log("values:", values);
    console.log("consulta:", consultaAtualizada);

    message.success("Consulta atualizada com sucesso!");
    navigate("/consultas");
  };

  return (
    <Card title="Editar Consulta" style={{ maxWidth: 900, margin: "auto" }}>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        
        <ConsultaForm />

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" block>
            Salvar Alterações
          </Button>
        </Space>
      </Form>
    </Card>
  );
}