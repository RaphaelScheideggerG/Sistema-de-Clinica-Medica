import React, { useState } from 'react';
import './FormularioConsulta.css';

const FormularioConsulta = () => {
  const [consulta, setConsulta] = useState({
    pacienteId: '',
    medicoId: '',
    diagnostico: '',
    data: ''
  });

  const listaPacientes = [
    { id: 1, nome: "Ana Silva" },
    { id: 2, nome: "Carlos Oliveira" },
    { id: 3, nome: "Beatriz Santos" }
  ];

  const listaMedicos = [
    { id: 101, nome: "Dr. Roberto (Cardiologista)" },
    { id: 102, nome: "Dra. Juliana (Dermatologista)" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConsulta((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados salvos:", consulta);
    alert(JSON.stringify(consulta));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      
      {/* SELEÇÃO DE PACIENTE */}
      <div className="campo">
        <label>Paciente:</label>
        <select 
          name="pacienteId" 
          value={consulta.pacienteId} 
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          {listaPacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nome}
            </option>
          ))}
        </select>
      </div>

      {/* SELEÇÃO DE MÉDICO */}
      <div className="campo">
        <label>Médico:</label>
        <select 
          name="medicoId" 
          value={consulta.medicoId} 
          onChange={handleChange}
          required
        >
          <option value="">Selecione...</option>
          {listaMedicos.map((medico) => (
            <option key={medico.id} value={medico.id}>
              {medico.nome}
            </option>
          ))}
        </select>
      </div>

      {/* DIAGNÓSTICO */}
      <div className="campo">
        <label>Diagnóstico:</label>
        <textarea
          name="diagnostico"
          value={consulta.diagnostico}
          onChange={handleChange}
          rows="3"
        />
      </div>

      {/* DATA */}
      <div className="campo">
        <label>Data:</label>
        <input
          type="date"
          name="data"
          value={consulta.data}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Salvar Consulta</button>
    </form>
  );
};
export default FormularioConsulta;