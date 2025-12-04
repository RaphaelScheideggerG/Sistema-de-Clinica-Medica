export default class Pessoa {
  #nome;
  #contato
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

setContato(tipo){
    if (tipo){
      this.#contato = tipo;
      return true;
    }
    return false;
  }

  getContato(){
    return this.#contato;
  }
}