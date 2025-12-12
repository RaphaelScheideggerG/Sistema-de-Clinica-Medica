import React from "react";
import { Form, Input, DatePicker, Select } from "antd";
import PacienteDAO from "../../objetos/dao/PacienteDAO.mjs";
import MedicoDAO from "../../objetos/dao/MedicoDAO.mjs";

export default function ConsultaForm() {
  const pdao = new PacienteDAO();
  const mdao = new MedicoDAO();

  const pacienteList = pdao.listar();
  const medicoList = mdao.listar();

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

      <Form.Item
        label="Data"
        name="data"
        rules={[{ required: true, message: "Selecione uma data" }]}
      >
        <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
      </Form.Item>
    </>
  );
}