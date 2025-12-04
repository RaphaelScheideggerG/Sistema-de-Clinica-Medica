import Pessoa from "./Pessoa.mjs";

export default class Paciente extends Pessoa {
    #cpf;
    #dataNascimento;

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
  

  setDataNascimento(data) {
      const d = new Date(data);

      // Verifica se a data é válida
      if (!isNaN(d.getTime())) {
          this.#dataNascimento = d;
          return true;
      }

      return false;
  }

  getDataNascimento() {
      return this.#dataNascimento;
  }

  
  }