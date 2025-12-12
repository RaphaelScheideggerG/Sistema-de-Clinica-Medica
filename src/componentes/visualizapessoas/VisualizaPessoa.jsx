import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button, Tag } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import PacienteDao from "../../objetos/dao/PacienteDAO.mjs";
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

export default function VisualizaPessoa() {
  const { tipo, id } = useParams();
  const navigate = useNavigate();

  const [pessoa, setPessoa] = useState(null);

  useEffect(() => {
    const dao = tipo === "Paciente" ? new PacienteDao() : new MedicoDAO();
    const lista = dao.listar();

    const encontrada = lista.find((p) => p.id === id);
    if (encontrada) setPessoa(encontrada);
  }, [tipo, id]);

  if (!pessoa) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h3>Nenhuma pessoa encontrada.</h3>
        <Button type="primary" onClick={() => navigate("/pessoas")}>
          Voltar à lista
        </Button>
      </div>
    );
  }

  // 🔧 Função para formatar contato
  const renderContato = () => {
    if (!pessoa.contato) return "Não informado";

    if (pessoa.contato.tipo === "Telefone") {
      const { ddd, numero } = pessoa.contato.contato || {};
      return <Tag color="blue">📞 ({ddd}) {numero}</Tag>;
    }

    if (pessoa.contato.tipo === "Email") {
      return <Tag color="green">📧 {pessoa.contato.contato}</Tag>;
    }
    console.log(pessoa)
    return pessoa.contato;
  };

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
        title={`Detalhes do ${tipo === "Paciente" ? "Paciente" : "Médico"}`}
        bordered={false}
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome">{pessoa.nome}</Descriptions.Item>

          {tipo === "Paciente" ? (
            <>
              <Descriptions.Item label="CPF">{pessoa.cpf}</Descriptions.Item>
                <Descriptions.Item label="Data de Nascimento">
                  {pessoa.dataNascimento 
                    ? dayjs(pessoa.dataNascimento).format("DD/MM/YYYY")
                    : "Não informado"}
                </Descriptions.Item>
              <Descriptions.Item label="Contato">{renderContato()}</Descriptions.Item>
            </>
          ) : (
            <>
              <Descriptions.Item label="CRM">
                {pessoa.crm ? `${pessoa.crm.numero}-${pessoa.crm.uf}` : "Não informado"}
              </Descriptions.Item>

              <Descriptions.Item label="Especialidade">
                {pessoa.especialidade}
              </Descriptions.Item>

              <Descriptions.Item label="Contato">
                {renderContato()}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() => navigate(`/editar-pessoa/${tipo}/${pessoa.id}`)}
            style={{ marginRight: 12 }}
          >
            Editar
          </Button>
          
          <Button onClick={() => navigate("/pessoas")}>
            Voltar
          </Button>

          <Button
            style={{ marginLeft: 12 }}
            onClick={() => navigate(`/consultas/${tipo}/${pessoa.id}`)}
          >
            Consultas
          </Button>


        </div>
      </Card>
    </div>
  );
}
