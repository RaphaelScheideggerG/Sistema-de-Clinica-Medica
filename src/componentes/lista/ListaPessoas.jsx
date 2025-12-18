import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Tag, Input, Select } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs"
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs"
import dayjs from 'dayjs';

export default function ListaPessoas() {
  const navigate = useNavigate();

  const [tipo, setTipo] = useState("Paciente");
  const [filtroNome, setFiltroNome] = useState("");
  const [dados, setDados] = useState([]);

  const pacienteDAO = new PacienteDAO()
  const medicoDAO = new MedicoDAO()

  function carregarLista() {
    const dao = tipo === "Paciente" ? pacienteDAO : medicoDAO;
    const lista = dao.listar();

    const filtrados = lista.filter((p) =>
      p.nome?.toLowerCase().includes(filtroNome.toLowerCase())
    );

    setDados(filtrados);
  }

  useEffect(() => {
    carregarLista();
  }, [tipo, filtroNome]);


  function excluirPessoa(id) {
    const dao = tipo === "Paciente" ? pacienteDAO : medicoDAO;
    dao.excluir(id);
    message.success("Registro excluído com sucesso!");
    carregarLista();
  }


  const colunasPaciente = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
      width: 160,
    },
    {
      title: "Data de Nascimento",
      dataIndex: "dataNascimento",
      key: "dataNascimento",
      width: 160,
      render: (data) => (data ? dayjs(data).format('DD/MM/YYYY') : "-"),
    },
    {
      title: "contato",
      key: "Contato",
      width: 200,
      render: (record) => {
        if (record.contato.tipo === "Telefone") {
          return `${record.contato.contato.ddd} ${record.contato.contato.numero}`;
        }
        return record.contato.contato;
      },
    },
    {
      title: "Ações",
      key: "acoes",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/visualizar-pessoa/${tipo}/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/editar-pessoa/${tipo}/${record.id}`)}
          />
          <Popconfirm
            title="Deseja realmente excluir?"
            onConfirm={() => excluirPessoa(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const colunasMedico = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    {
      title: "CRM",
      key: "crm",
      width: 140,
      render: (_, record) => 
        record.crm
          ? `${record.crm.numero}-${record.crm.uf}` 
          : "N/A",
    },
    {
      title: "Especialidade",
      dataIndex: "especialidade",
      key: "especialidade",
      width: 200,
    },
    {
      title: "Contato",
      key: "contato",
      width: 200,
      render: (record) => {
        if (record.contato.tipo === "Telefone") {
          return `${record.contato.contato.ddd} ${record.contato.contato.numero}`;
        }
        return record.contato.contato;
      },
    },
    {
      title: "Ações",
      key: "acoes",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/visualizar-pessoa/${tipo}/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/editar-pessoa/${tipo}/${record.id}`)}
          />
          <Popconfirm
            title="Deseja realmente excluir?"
            onConfirm={() => excluirPessoa(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const colunas = tipo === "Paciente" ? colunasPaciente : colunasMedico;
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
        Listagem de Pessoas
      </h2>


      <Space wrap style={{ marginBottom: 20 }}>
        <Select
          value={tipo}
          onChange={(v) => setTipo(v)}
          style={{ width: 200 }}
          options={[
            { value: "Paciente", label: "Paciente" },
            { value: "Medico", label: "Médico" },
          ]}
        />
        <Input
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          allowClear
          style={{ minWidth: 200, maxWidth: "100%" }}
        />
        <Button type="primary" onClick={carregarLista}>
          Atualizar
        </Button>
      </Space>


      <Table
        dataSource={dados}
        columns={colunas}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
}