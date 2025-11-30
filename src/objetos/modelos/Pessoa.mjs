export default class Pessoa {
  #nome;

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

}