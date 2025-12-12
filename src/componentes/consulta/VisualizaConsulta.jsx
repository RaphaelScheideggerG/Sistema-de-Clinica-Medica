import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ConsultaDAO from "../../objetos/dao/ConsultaDAO.mjs";
import { normalizarListaConsultas } from "../../utils/normalizadores.mjs";

export default function VisualizaConsulta() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const dao = new ConsultaDAO();
    const lista = normalizarListaConsultas(dao.listar());

    const encontrada = lista.find((c) => c.id === id);
    if (encontrada) setConsulta(encontrada);
  }, [id]);

  if (!consulta) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h3>Nenhuma consulta encontrada.</h3>
        <Button type="primary" onClick={() => navigate("/consultas")}>
          Voltar à lista
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "24px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Card title="Detalhes da Consulta" bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Paciente">
            {consulta.pacienteNome}
          </Descriptions.Item>

          <Descriptions.Item label="Médico">
            {consulta.medicoNome}
          </Descriptions.Item>

          <Descriptions.Item label="Data">
            {consulta.data
              ? dayjs(consulta.data).format("DD/MM/YYYY")
              : "Não informado"}
          </Descriptions.Item>

          <Descriptions.Item label="Diagnóstico">
            {consulta.diagnostico || "Não informado"}
          </Descriptions.Item>

          <Descriptions.Item label="Tratamento">
            {consulta.tratamento || "Não informado"}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() => navigate(`/editar-consulta/${consulta.id}`)}
            style={{ marginRight: 12 }}
          >
            Editar
          </Button>

          <Button onClick={() => navigate("/consultas")}>Voltar</Button>

          <Button
            style={{ marginLeft: 12 }}
            onClick={() => navigate(`/visualizar-pessoa/Paciente/${consulta.pacienteID}`)}
          >
            Ver Paciente
          </Button>

          <Button
            style={{ marginLeft: 12 }}
            onClick={() => navigate(`/visualizar-pessoa/Medico/${consulta.medicoID}`)}
          >
            Ver Médico
          </Button>
        </div>
      </Card>
    </div>
  );
}