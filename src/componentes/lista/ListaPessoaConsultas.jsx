import React, { useEffect, useState } from "react";
import { Table, Button, Space, DatePicker, message, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import ConsultaDAO from "../../objetos/dao/ConsultaDAO.mjs";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs";
import { normalizarListaConsultas } from "../../utils/normalizadores.mjs";

const { RangePicker } = DatePicker;

export default function ListaPessoaConsultas() {
  const { tipo, id } = useParams(); // tipo = "Paciente" ou "Medico"
  const navigate = useNavigate();

  const [periodo, setPeriodo] = useState([]);
  const [dados, setDados] = useState([]);
  const [nomePessoa, setNomePessoa] = useState("");

  // Buscar nome da pessoa
  function encontrarPessoa() {
    const dao = tipo === "Paciente" ? new PacienteDAO() : new MedicoDAO();
    const lista = dao.listar();
    const encontrada = lista.find((p) => p.id === id);
    if (encontrada) setNomePessoa(encontrada.nome);
  }

  function buscarConsultas() {
    const dao = new ConsultaDAO();
    let consultas = dao.listar();

    //Filtrar pela pessoa específica
    consultas = consultas.filter((c) =>
      tipo === "Paciente" ? c.pacienteID === id : c.medicoID === id
    );

    // Filtrar por período
    if (periodo.length === 2) {
      const [inicio, fim] = periodo;

      consultas = consultas.filter((c) => {
        const dataConsulta = dayjs(c.data);
        return (
          dataConsulta.isSameOrAfter(inicio, "day") &&
          dataConsulta.isSameOrBefore(fim, "day")
        );
      });
    }

    const pacientes = new PacienteDAO().listar();
    const medicos = new MedicoDAO().listar();

    const mapaPacientes = Object.fromEntries(pacientes.map((p) => [p.id, p.nome]));
    const mapaMedicos = Object.fromEntries(medicos.map((m) => [m.id, m.nome]));

    const normalizadas = normalizarListaConsultas(
      consultas,
      mapaPacientes,
      mapaMedicos
    );

    setDados(normalizadas);
  }

  useEffect(() => {
    encontrarPessoa();
    buscarConsultas();
  }, [periodo, tipo, id]);

  const colunas = [
    { title: "Paciente", dataIndex: "pacienteNome", key: "pacienteID" },
    { title: "Médico", dataIndex: "medicoNome", key: "medicoID" },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
      render: (data) => dayjs(data).format("DD/MM/YYYY"),
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
            onConfirm={() => {
              const dao = new ConsultaDAO();
              dao.excluir(record.id);
              message.success("Registro excluído com sucesso!");
              buscarConsultas();
            }}
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
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Consultas de {nomePessoa} ({tipo})
      </h2>

      <Space style={{ marginBottom: 20 }}>
        <RangePicker
          format="DD/MM/YYYY"
          value={periodo}
          onChange={(values) => setPeriodo(values || [])}
          style={{ width: 260 }}
        />

        <Button type="primary" onClick={buscarConsultas}>
          Atualizar
        </Button>
      </Space>

      <Table
        dataSource={dados}
        columns={colunas}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
}