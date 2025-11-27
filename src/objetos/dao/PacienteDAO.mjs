import PF from "../modelos/PF.mjs";


export default class PFDAO {
  constructor() {
    this.chave = "pessoasFisicas";
  }


  listar() {
    try {
      const dados = localStorage.getItem(this.chave);
      return dados ? JSON.parse(dados) : [];
    } catch (e) {
      console.error("Erro ao ler PF:", e);
      return [];
    }
  }


  gerarId() {
    // Gera ID único (timestamp + random)
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
  }


  toPlain(pf) {
    if (!pf) return {};
    const end = pf.getEndereco?.();
    const telefones = pf.getTelefones?.() || [];
    const data = pf.getDataNascimento?.() || "";

    return {
      id: pf.id ?? this.gerarId(), // ← garante ID único
      nome: pf.getNome?.(),
      email: pf.getEmail?.(),
      cpf: pf.getCPF?.(),
      datanascimento: data,
      endereco: end
        ? {
            cep: end.getCep?.(),
            logradouro: end.getLogradouro?.(),
            bairro: end.getBairro?.(),
            cidade: end.getCidade?.(),
            uf: end.getUf?.(),
            regiao: end.getRegiao?.(),
          }
        : {},
      telefones: telefones.map((t) => ({
        ddd: t.getDdd?.(),
        numero: t.getNumero?.(),
      })),
    };
  }


  salvar(pf) {
    const lista = this.listar();
    const obj = this.toPlain(pf);
    if (!obj.id) obj.id = this.gerarId();
    lista.push(obj);
    localStorage.setItem(this.chave, JSON.stringify(lista));
    return obj;
  }


  atualizar(id, novoPF) {
    const lista = this.listar();
    const obj = this.toPlain(novoPF);
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
