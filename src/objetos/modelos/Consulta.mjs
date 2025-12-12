export default class Consulta {
  #pacienteID
  #medicoID
  #data
  #diagnostico
  #tratamento

  setPacienteID(id) {
    if (id) {
      this.#pacienteID = id;
      return true;
    }
    return false;
  }

  getPacienteID() {
    return this.#pacienteID;
  }

  setMedicoID(id) {
    if (id) {
      this.#medicoID = id;
      return true;
    }
    return false;
  }

  getMedicoID() {
    return this.#medicoID;
  }

  setDiagnostico(texto) {
    if (texto) {
      this.#diagnostico = texto;
      return true;
    }
    return false;
  }

  getDiagnostico() {
    return this.#diagnostico;
  }

  setTratamento(texto) {
    if (texto) {
      this.#tratamento = texto;
      return true;
    }
    return false;
  }

  getTratamento() {
    return this.#tratamento;
  }

  setData(data) {
    if (data) {
      this.#data = data;
      return true;
    }
    return false;
  }

  getData() {
    return this.#data;
  }
}