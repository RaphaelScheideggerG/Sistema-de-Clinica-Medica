import React from "react";
import { Form, Input, DatePicker, Select, Col, Row } from "antd";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs";

export default function ConsultaForm() {
  const pdao = new PacienteDAO();
  const mdao = new MedicoDAO();

  const pacienteList = pdao.listar();
  const medicoList = mdao.listar();

  const turnos = [
  { label: "(08:00–9:30)", value: "08:00–9:30" },
  { label: "(9:30–11:00)", value: "9:30–11:00" },
  { label: "(11:00–12:00)", value: "11:00–12:00" },

  { label: "(13:00–14:30)", value: "13:00–14:30" },
  { label: "(14:30–16:00)", value: "14:30–16:00" },
  { label: "(16:00–17:00)", value: "16:00–17:00" },

  { label: "(18:00–19:30)", value: "18:00–19:30" },
  { label: "(19:30–21:00)", value: "19:30–21:00" },
  { label: "(21:00–22:00)", value: "21:00–22:00" },
  ];

  return (
    <>
      <Form.Item
        label="Paciente"
        name="pacienteID"
        rules={[{ required: true, message: "Selecione o paciente" }]}
      >
        <Select
          showSearch
          placeholder="Selecione o paciente"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {pacienteList.map((p) => (
            <Select.Option key={p.id} value={p.id}>
              {p.nome}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Médico"
        name="medicoID"
        rules={[{ required: true, message: "Selecione o médico" }]}
      >
        <Select
          showSearch
          placeholder="Selecione o médico"
          optionFilterProp="label"
          options={medicoList.map((m) => ({
            label: `${m.nome} — ${m.especialidade}`,
            value: m.id,
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Diagnóstico"
        name="diagnostico"
        rules={[{ required: true, message: "Forneça um diagnóstico" }]}
      >
        <Input.TextArea rows={3} placeholder="Descreva o diagnóstico" />
      </Form.Item>

      <Form.Item
        label="Tratamento"
        name="tratamento"
        rules={[{ required: true, message: "Forneça um tratamento" }]}
      >
        <Input.TextArea rows={3} placeholder="Descreva o tratamento" />
      </Form.Item>
      {/*Quero Data e Turno um ao lado do outro no form, vamos ver como fica a responsividade depois*/}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Data"
            name="data"
            rules={[{ required: true, message: "Selecione uma data" }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Turno"
            name="turno"
            rules={[{ required: true, message: "Selecione o turno" }]}
          >
            <Select options={turnos} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}