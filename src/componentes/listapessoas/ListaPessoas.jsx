import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Tag, Input, Select } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PFDAO from "../../objetos/dao/PFDAO.mjs";
import PJDAO from "../../objetos/dao/PJDAO.mjs";


export default function ListaPessoas() {
  const navigate = useNavigate();


  const [tipo, setTipo] = useState("PF");
  const [filtroNome, setFiltroNome] = useState("");
  const [dados, setDados] = useState([]);


  const pfDAO = new PFDAO();
  const pjDAO = new PJDAO();


  function carregarLista() {
    const dao = tipo === "PF" ? pfDAO : pjDAO;
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
    const dao = tipo === "PF" ? pfDAO : pjDAO;
    dao.excluir(id);
    message.success("Registro excluído com sucesso!");
    carregarLista();
  }


  const colunas = [
    { title: "Nome", dataIndex: "nome", key: "nome" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: tipo === "PF" ? "CPF" : "CNPJ",
      dataIndex: tipo === "PF" ? "cpf" : "cnpj",
      key: "doc",
      width: 200,
    },
    {
      title: "Ações",
      key: "acoes",
      width: 180,
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/visualizar/${tipo}/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/editar/${tipo}/${record.id}`)}
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


  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "24px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Listagem de Pessoas
      </h2>


      <Space style={{ marginBottom: 20 }}>
        <Select
          value={tipo}
          onChange={(v) => setTipo(v)}
          style={{ width: 200 }}
          options={[
            { value: "PF", label: "Pessoa Física" },
            { value: "PJ", label: "Pessoa Jurídica" },
          ]}
        />
        <Input
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          allowClear
          style={{ width: 300 }}
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
      />
    </div>
  );
}
