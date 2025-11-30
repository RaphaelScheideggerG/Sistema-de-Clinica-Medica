import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import PacienteDao from "../../objetos/dao/PacienteDAO.mjs";
import dayjs from "dayjs"; // ✅ importa o dayjs
import "dayjs/locale/pt-br"; // opcional, para usar locale brasileiro
dayjs.locale("pt-br");

export default function VisualizaPessoa() {
  const { tipo, id } = useParams();
  const navigate = useNavigate();

  const [pessoa, setPessoa] = useState(null);

  useEffect(() => {
    const dao = tipo === "Paciente" ? new PacienteDao() : new PJDAO();
    const lista = dao.listar();

    const encontrada = lista.find((p) => p.id === id);
    if (encontrada) setPessoa(encontrada);
  }, [tipo, id]);

  if (!pessoa) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h3>Nenhuma pessoa encontrada.</h3>
        <Button type="primary" onClick={() => navigate("/lista")}>
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
      <Card
        title={`Detalhes da ${tipo === "Paciente" ? "Paciente" : "Médico"}`}
        bordered={false}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome">{pessoa.nome}</Descriptions.Item>

          {tipo === "Paciente" ? (
            <>
              <Descriptions.Item label="CPF">{pessoa.cpf}</Descriptions.Item>
              <Descriptions.Item label="Data de Nascimento">
                {pessoa.datanascimento
                  ? dayjs(pessoa.datanascimento).format("DD/MM/YYYY")
                  : "Não informado"}
              </Descriptions.Item>
            </>
          ) : (
            <Descriptions.Item label="CNPJ">{pessoa.cnpj}</Descriptions.Item>
          )}
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() => navigate(`/editar/${tipo}/${pessoa.id}`)}
            style={{ marginRight: 12 }}
          >
            Editar
          </Button>
          <Button onClick={() => navigate("/lista")}>Voltar</Button>
        </div>
      </Card>
    </div>
  );
}
