import Pessoa from "./Pessoa.mjs";

export default class PF extends Pessoa {
  #cpf;
  #datanascimento;

  setCPF(cpf) {
    if (cpf) {
      this.#cpf = cpf;
      return true;
    }
    return false;
  }

  getCPF() {
    return this.#cpf;
  }

  setDataNascimento(dataNascimento){
    if (dataNascimento){
      this.#datanascimento = dataNascimento
      return true;
    }
    return false;
  }

  getDataNascimento() {
    return this.#datanascimento;
  }
}