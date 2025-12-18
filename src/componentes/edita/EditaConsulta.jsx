import React, { useEffect } from "react";
import { Form, Card, message, Button, Space } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { criarConsulta } from "../../utils/normalizadores.mjs";
import dayjs from "dayjs";

import ConsultaDAO from "../../objetos/dao/ConsultaDAO.mjs";
import ConsultaForm from "../form/ConsultaForm.jsx";
import Consulta from "../../objetos/modelos/Consulta.mjs"


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
    try {
      const consultaAtualizada = criarConsulta(values);
      consultaAtualizada.id = id;

      const consultas = dao.listar();

      // Normalizar data para comparação
      const dataFormatada = values.data.toISOString().slice(0, 10);

      const consultasMesmoTurno = consultas.filter((c) => {
        const dataConsulta = new Date(c.data).toISOString().slice(0, 10);

        return (
          c.id !== id && // IGNORA A PRÓPRIA CONSULTA
          c.medicoID === values.medicoID &&
          dataConsulta === dataFormatada &&
          c.turno === values.turno
        );
      });

      if (consultasMesmoTurno.length >= Consulta.getLimiteTurno()) {
        message.error("Limite de consultas para esse turno atingido!");
        return;
      }

      dao.atualizar(id, consultaAtualizada);

      console.log("values:", values);
      console.log("consulta:", consultaAtualizada);

      message.success("Consulta atualizada com sucesso!");
      navigate("/consultas");

    } catch (e) {
      message.error("Erro ao atualizar: " + e.message);
      console.log(e);
    }
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