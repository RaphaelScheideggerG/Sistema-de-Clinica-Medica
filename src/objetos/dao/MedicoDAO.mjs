import Medico from "../modelos/Medico.mjs";


export default class MedicoDAO {
  constructor() {
    this.chave = "medicos";
  }


  listar() {
    try {
      const dados = localStorage.getItem(this.chave);
      return dados ? JSON.parse(dados) : [];
    } catch (e) {
      console.error("Erro ao ler Médico:", e);
      return [];
    }
  }


  gerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }


  toPlain(medico) {
    return {
      id: medico.id ?? this.gerarId(),
      nome: medico.getNome?.(),
      especialidade: medico.getEspecialidade?.(),
      crm: medico.getCRM?.(),
      contato: medico.getContato?.(),
    };
  }


  salvar(medico) {
    const lista = this.listar();
    const obj = this.toPlain(medico);
    if (!obj.id) obj.id = this.gerarId();
    lista.push(obj);
    localStorage.setItem(this.chave, JSON.stringify(lista));
    return obj;
  }


  atualizar(id, novoMedico) {
    const lista = this.listar();
    const obj = this.toPlain(novoMedico);
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
