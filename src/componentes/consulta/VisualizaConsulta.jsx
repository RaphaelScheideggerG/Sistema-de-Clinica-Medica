import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { normalizarListaConsultas } from "../../utils/normalizadores.mjs";
import dayjs from "dayjs";
import ConsultaDAO from "../../objetos/dao/ConsultaDAO.mjs";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs";

export default function VisualizaConsulta() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    const dao = new ConsultaDAO();
    const consultas = dao.listar();

    const pacientes = new PacienteDAO().listar();
    const medicos = new MedicoDAO().listar();

    const mapaPacientes = Object.fromEntries(pacientes.map(p => [p.id, p.nome]));
    const mapaMedicos = Object.fromEntries(medicos.map(m => [m.id, m.nome]));

    const lista = normalizarListaConsultas(consultas, mapaPacientes, mapaMedicos);

    const encontrada = lista.find((c) => c.id === id);
    if (encontrada) setConsulta(encontrada);
  }, [id]);

  // ✅ Protege contra consulta nula
  if (!consulta) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <p>Carregando consulta...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "24px auto", background: "#fff", padding: 24, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <Card title="Detalhes da Consulta" bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Paciente">{consulta.pacienteNome}</Descriptions.Item>
          <Descriptions.Item label="Médico">{consulta.medicoNome}</Descriptions.Item>
          <Descriptions.Item label="Data">
            {consulta.data ? dayjs(consulta.data).format("DD/MM/YYYY") : "Não informado"}
          </Descriptions.Item>
          <Descriptions.Item label="Diagnóstico">{consulta.diagnostico || "Não informado"}</Descriptions.Item>
          <Descriptions.Item label="Tratamento">{consulta.tratamento || "Não informado"}</Descriptions.Item>
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button type="primary" onClick={() => navigate(`/editar-consulta/${consulta.id}`)} style={{ marginRight: 12 }}>
            Editar
          </Button>
          <Button onClick={() => navigate("/consultas")}>Voltar</Button>
          <Button style={{ marginLeft: 12 }} onClick={() => navigate(`/visualizar-pessoa/Paciente/${consulta.pacienteID}`)}>
            Ver Paciente
          </Button>
          <Button style={{ marginLeft: 12 }} onClick={() => navigate(`/visualizar-pessoa/Medico/${consulta.medicoID}`)}>
            Ver Médico
          </Button>
        </div>
      </Card>
    </div>
  );
}