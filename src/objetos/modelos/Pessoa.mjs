export default class Pessoa {
  #nome;
  #dataNascimento;

  // ----- NOME -----
  setNome(nome) {
      if (nome) {
          this.#nome = nome;
          return true;
      }
      return false;
  }

  getNome() {
      return this.#nome;
  }

  // ----- DATA DE NASCIMENTO -----
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

  // ----- IDADE -----
  getIdade() {
      if (!this.#dataNascimento) return null;

      const hoje = new Date();
      let idade = hoje.getFullYear() - this.#dataNascimento.getFullYear();

      const mes = hoje.getMonth() - this.#dataNascimento.getMonth();
      const dia = hoje.getDate() - this.#dataNascimento.getDate();

      // Ajuste se ainda não fez aniversário no ano
      if (mes < 0 || (mes === 0 && dia < 0)) {
          idade--;
      }

      return idade;
  }
}