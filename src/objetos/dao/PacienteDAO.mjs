import Paciente from "../modelos/Paciente.mjs";


export default class PacienteDAO {
  constructor() {
    this.chave = "pacientes"; // Chave de acesso aos pacientes no localstorage
  }


  listar() {
    try {
      const dados = localStorage.getItem(this.chave);
      return dados ? JSON.parse(dados) : [];
    } catch (e) {
      console.error("Erro ao ler Paciente:", e);
      return [];
    }
  }


  gerarId() {
    // Gera ID único (timestamp + random)
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }


  toPlain(paciente) {
    if (!paciente) return {};
    const data = paciente.getDataNascimento?.() || "";

    let contato = paciente.getContato?.();
    if (contato?.tipo === "Telefone") {
      contato = `(${contato.contato.ddd}) ${contato.contato.numero}`;
    }

    return {
      id: paciente.id ?? this.gerarId(),
      contato,
      nome: paciente.getNome?.(),
      cpf: paciente.getCPF?.(),
      datanascimento: data,
    };
  }



  salvar(paciente) {
    const lista = this.listar();
    const obj = this.toPlain(paciente);
    if (!obj.id) obj.id = this.gerarId();
    lista.push(obj);
    localStorage.setItem(this.chave, JSON.stringify(lista));
    return obj;
  }


  atualizar(id, novoPaciente) {
    const lista = this.listar();
    const obj = this.toPlain(novoPaciente);
    obj.id = id;


    const idx = lista.findIndex((p) => p.id === id);
    if (idx >= 0) lista[idx] = obj;
    else lista.push(obj);


    localStorage.setItem(this.chave, JSON.stringify(lista));
  }


  excluir(id) {
    const novaLista = this.listar().filter((p) => p.id !== id);
    localStorage.setItem(this.chave, JSON.stringify(novaLista));
  }
}
