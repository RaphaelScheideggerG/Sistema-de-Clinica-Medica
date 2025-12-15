import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { normalizarListaConsultas } from "../../utils/normalizadores.mjs";
import dayjs from "dayjs";
import ConsultaDAO from "../../objetos/dao/ConsultaDAO.mjs";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs"
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs"

export default function ListaConsultas() {
  const navigate = useNavigate();

  const [filtroData, setFiltroData] = useState("");
  const [dados, setDados] = useState([]);

  // Função para achar as consultas
  function encontrarConsulta() {
    const dao = new ConsultaDAO();
    const consultas = dao.listar();

    let filtradas = consultas;
    if (filtroData.trim() !== "") {
      filtradas = filtradas.filter((c) => {
        const dataConsulta = dayjs(c.data).format("DD/MM/YYYY");
        return dataConsulta.includes(filtroData);
      });
    }

    // ✅ Carregar nomes de pacientes e médicos
    const pacientes = new PacienteDAO().listar();
    const medicos = new MedicoDAO().listar();

    const mapaPacientes = Object.fromEntries(pacientes.map(p => [p.id, p.nome]));
    const mapaMedicos = Object.fromEntries(medicos.map(m => [m.id, m.nome]));

    // ✅ Passar os mapas para o normalizador
    const normalizadas = normalizarListaConsultas(filtradas, mapaPacientes, mapaMedicos);

    setDados(normalizadas);
    console.log("Consultas encontradas:", normalizadas);
  }

  function excluirConsulta(id) {
    const dao = new ConsultaDAO();
    dao.excluir(id);
    message.success("Registro excluído com sucesso!");
    encontrarConsulta();
    encontrarPessoa();
  }

  useEffect(() => {
    encontrarConsulta();
  }, [filtroData]);

  const colunasConsultas = [
    { title: "Paciente", dataIndex: "pacienteNome", key: "pacienteID" },
    { title: "Médico", dataIndex: "medicoNome", key: "medicoID", width: 160 },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      width: 160,
      render: (data) => (data ? dayjs(data).format("DD/MM/YYYY") : "-"),
    },
    {
      title: "Turno",
      dataIndex: "turno",
      key: "turno",
      width: 140,
      render: (turno) => turno || "-",
    },
    {
      title: "Ações",
      key: "acoes",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/visualizar-consulta/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/editar-consulta/${record.id}`)}
          />
          <Popconfirm
            title="Deseja realmente excluir?"
            onConfirm={() => excluirConsulta(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1000,
        margin: "24px auto",
        background: "#fff",
        padding: "16px",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        overflowX: "hidden",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Consultas Gerais
      </h2>

      <Space style={{ marginBottom: 20 }}>
        <Input
          placeholder="Filtrar por data"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
          allowClear
          style={{ width: 190 }}
        />
        <Button type="primary" onClick={encontrarConsulta}>
          Atualizar
        </Button>
      </Space>

      <Table
        dataSource={dados}
        columns={colunasConsultas}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
}