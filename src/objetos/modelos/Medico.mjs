import Pessoa from "./Pessoa.mjs";

export default class Medico extends Pessoa {
  #especialidade;
  #crm;

  setEspecialidade(e) {
    this.#especialidade = e;
  }

  getEspecialidade() {
    return this.#especialidade;
  }

  setCRM(c) {
    this.#crm = c;
  }

  getCRM() {
    return this.#crm;
  }
}
