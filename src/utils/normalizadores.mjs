import Paciente from "../objetos/modelos/Paciente.mjs";
import Medico from "../objetos/modelos/Medico.mjs";


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

export function criarPessoa(values, tipo) {
  let pessoa;

  if (tipo === "Paciente") {
    pessoa = new Paciente();
    pessoa.setCPF(values.cpf);
    pessoa.setDataNascimento(values.dataNascimento?.format("DD/MM/YYYY"));
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

