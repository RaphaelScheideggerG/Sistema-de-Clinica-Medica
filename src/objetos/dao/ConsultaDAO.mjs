import Consulta from "../modelos/Consulta.mjs"

export default class ConsultaDAO {
    constructor() {
    this.chave = "consultas";
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
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }


  toPlain(consulta) {
    if (!consulta) return {};
    const data = consulta.getData?.() || "";
    return {
      id: consulta.id ?? this.gerarId(),
      pacienteID: consulta.getPacienteID?.(),
      medicoID: consulta.getMedicoID?.(),
      diagnostico: consulta.getDiagnostico?.(),
      data: data,
    };
  }


  salvar(consulta) {
    const lista = this.listar();
    const obj = this.toPlain(consulta);
    if (!obj.id) obj.id = this.gerarId();
    lista.push(obj);
    localStorage.setItem(this.chave, JSON.stringify(lista));
    return obj;
  }


  atualizar(id, novaConsulta) {
    const lista = this.listar();
    const obj = this.toPlain(novaConsulta);
    obj.id = id;

    const idx = lista.findIndex((c) => c.id === id);
    if (idx >= 0) lista[idx] = obj;
    else lista.push(obj);


    localStorage.setItem(this.chave, JSON.stringify(lista));
  }


  excluir(id) {
    const novaLista = this.listar().filter((c) => c.id !== id);
    localStorage.setItem(this.chave, JSON.stringify(novaLista));
  }
}