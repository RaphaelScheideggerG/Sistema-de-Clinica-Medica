import Paciente from "../objetos/modelos/Paciente.mjs";
import Medico from "../objetos/modelos/Medico.mjs";
import PacienteDAO from "../objetos/dao/PacienteDAO.mjs";
import MedicoDAO from "../objetos/dao/MedicoDAO.mjs";
import Consulta from "../objetos/modelos/Consulta.mjs";

/* -----------------------------
   NORMALIZAR CONTATO
----------------------------- */
export function normalizarContato(values) {
  if (values.contatoTipo === "Telefone") {
    return {
      tipo: "Telefone",
      contato: {
        ddd: values.telefone?.ddd,
        numero: values.telefone?.numero,
      },
    };
  }

  return {
    tipo: "Email",
    contato: values.email,
  };
}

/* -----------------------------
   CRIAR PACIENTE OU MÉDICO
----------------------------- */
export function criarPessoa(values, tipo) {
  let pessoa;

  if (tipo === "Paciente") {
    pessoa = new Paciente();
    pessoa.setCPF(values.cpf);
    pessoa.setDataNascimento(values.dataNascimento?.toISOString());
  } else {
    pessoa = new Medico();
    pessoa.setEspecialidade(values.especialidade);

    const crm = values.crm
      ? { numero: values.crm.numero, uf: values.crm.uf }
      : null;

    if (crm) pessoa.setCRM(crm);
  }

  pessoa.setNome(values.nome);
  pessoa.setContato(normalizarContato(values));

  return pessoa;
}

/* -----------------------------
   NORMALIZAR CONSULTA (1 item)
----------------------------- */
export function normalizarConsulta(consulta) {
  const pacienteDAO = new PacienteDAO();
  const medicoDAO = new MedicoDAO();

  const pacientes = pacienteDAO.listar();
  const medicos = medicoDAO.listar();

  const paciente = pacientes.find((p) => p.id === consulta.pacienteID);
  const medico = medicos.find((m) => m.id === consulta.medicoID);

  return {
    ...consulta,
    pacienteNome: paciente?.nome || "Desconhecido",
    medicoNome: medico?.nome || "Desconhecido",
  };
}

/* -----------------------------
   NORMALIZAR LISTA DE CONSULTAS
----------------------------- */
export function normalizarListaConsultas(lista) {
  const pacienteDAO = new PacienteDAO();
  const medicoDAO = new MedicoDAO();

  const pacientes = pacienteDAO.listar();
  const medicos = medicoDAO.listar();

  const mapaPacientes = Object.fromEntries(
    pacientes.map((p) => [p.id, p.nome])
  );

  const mapaMedicos = Object.fromEntries(
    medicos.map((m) => [m.id, m.nome])
  );

  return lista.map((c) => ({
    ...c,
    pacienteNome: mapaPacientes[c.pacienteID] || "Desconhecido",
    medicoNome: mapaMedicos[c.medicoID] || "Desconhecido",
  }));
}

/* -----------------------------
   CRIAR CONSULTA
----------------------------- */
export function criarConsulta(values) {
  let consulta;
  consulta = new Consulta();
  consulta.setPacienteID(values.pacienteID);
  consulta.setMedicoID(values.medicoID);
  consulta.setDiagnostico(values.diagnostico);
  consulta.setTratamento(values.tratamento);
  consulta.setData(values.data);
  return consulta;
}