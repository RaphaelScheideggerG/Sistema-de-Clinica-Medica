export default class Paciente extends Pessoa {
    #cpf;
    #titulo;
  
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
  
    setTitulo(titulo) {
      if (titulo instanceof Titulo) {
        this.#titulo = titulo;
        titulo.setPF(this);
        return true;
      }
      return false;
    }
  
    getTitulo() {
      return this.#titulo;
    }
  }