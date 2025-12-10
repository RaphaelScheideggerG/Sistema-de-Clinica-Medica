import React, { useState } from 'react';
import './FormularioConsulta.css';

const FormularioConsulta = () => {
  const [consulta, setConsulta] = useState({
    pacienteId: '',
    medicoId: '',
    diagnostico: '',
    data: ''
  });

  const [listaConsultas, setListaConsultas] = useState([]);

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
    
    const pacienteEncontrado = listaPacientes.find(p => p.id == consulta.pacienteId);
    const medicoEncontrado = listaMedicos.find(m => m.id == consulta.medicoId);

    const novaConsulta = {
      ...consulta,
      id: Date.now(),
      pacienteNome: pacienteEncontrado ? pacienteEncontrado.nome : 'Desconhecido',
      medicoNome: medicoEncontrado ? medicoEncontrado.nome : 'Desconhecido'
    };

    setListaConsultas([...listaConsultas, novaConsulta]);
    setConsulta({ pacienteId: '', medicoId: '', diagnostico: '', data: '' });
  };

  return (
    <div className="container-geral">
      {/* --- FORMULÁRIO --- */}
      <form onSubmit={handleSubmit} className="form-container">
        <h3>Nova Consulta</h3>
        
        <div className="campo">
          <label>Paciente:</label>
          <select name="pacienteId" value={consulta.pacienteId} onChange={handleChange} required>
            <option value="">Selecione...</option>
            {listaPacientes.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Médico:</label>
          <select name="medicoId" value={consulta.medicoId} onChange={handleChange} required>
            <option value="">Selecione...</option>
            {listaMedicos.map((m) => (
              <option key={m.id} value={m.id}>{m.nome}</option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Diagnóstico:</label>
          <textarea name="diagnostico" value={consulta.diagnostico} onChange={handleChange} rows="2" />
        </div>

        <div className="campo">
          <label>Data:</label>
          <input type="date" name="data" value={consulta.data} onChange={handleChange} required />
        </div>

        <button type="submit">Salvar Consulta</button>
      </form>

      <hr />

      {/* --- TABELA DE LISTAGEM --- */}
      <div className="tabela-container">
        <h3>Consultas Agendadas</h3>
        <table border="1" style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{backgroundColor: '#eee'}}>
              <th>Data</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Diagnóstico</th>
            </tr>
          </thead>
          <tbody>
            {listaConsultas.length === 0 ? (
              <tr>
                <td colSpan="4" style={{textAlign: 'center'}}>Nenhuma consulta agendada.</td>
              </tr>
            ) : (
              listaConsultas.map((item) => (
                <tr key={item.id}>
                  <td>{item.data}</td>
                  <td>{item.pacienteNome}</td>
                  <td>{item.medicoNome}</td>
                  <td>{item.diagnostico}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormularioConsulta;