import React, { useState } from "react";
import { Form, Input, Radio, Button, message, Space, Card } from "antd";

import TelefoneForm from "./TelefoneForm";
import EmailForm from "./EmailForm";
import { criarConsulta, criarPessoa } from "../../utils/normalizadores.mjs";

import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import PacienteForm from "./PacienteForm.jsx";

import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs"
import MedicoForm from "./MedicoForm.jsx"

import PessoaForm from "./PessoaForm.jsx";
import ConsultaDAO from "../../objetos/dao/ConsultaDAO.mjs";
import ConsultaForm from "../consulta/ConsultaForm.jsx";

export default function PessoaFormOO() {
  const [form] = Form.useForm();
  const [tipo, setTipo] = useState("Paciente");
  const contatoTipo = Form.useWatch("contatoTipo", form) || "Telefone";
  
  const onChangeTipo = (e) => setTipo(e.target.value);

  const onFinish = async (values) => {
    try {
      let dao;
      let entidade;

      if (tipo === "Paciente" || tipo === "Medico") {
        entidade = criarPessoa(values, tipo);
        dao = tipo === "Paciente" ? new PacienteDAO() : new MedicoDAO();
        await dao.salvar(entidade);
        message.success("Pessoa cadastrada com sucesso!");
      } 
      else if (tipo === "Consulta") {
        entidade = criarConsulta(values);
        dao = new ConsultaDAO();
        await dao.salvar(entidade);
        message.success("Consulta cadastrada com sucesso!");
      }

      form.resetFields();

      console.log("SUCESSO");
      console.log("values:", values);
      console.log("Entidade salva:", entidade);

    } catch (e) {
      message.error("Erro ao salvar: " + e.message);
      console.log(e);
    }
  };




  return (
    <Card title="Cadastro" style={{ maxWidth: 900, margin: "auto" }}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        
        <Form.Item label="Tipo de Cadastro" name="tipo" initialValue="Paciente">
          <Radio.Group onChange={onChangeTipo}>
            <Radio value="Paciente">Paciente</Radio>
            <Radio value="Medico">Médico</Radio>
            <Radio value="Consulta">Consulta</Radio>
          </Radio.Group>
        </Form.Item>

         {tipo === "Consulta" ? (<ConsultaForm/>) : (<PessoaForm type={tipo} contatoType={contatoTipo}/>)}

        <Space direction="vertical" style={{ width: "100%" }}>
          <Button type="primary" htmlType="submit" block>
            Salvar
          </Button>
        </Space>

      </Form>
    </Card>
  );
}