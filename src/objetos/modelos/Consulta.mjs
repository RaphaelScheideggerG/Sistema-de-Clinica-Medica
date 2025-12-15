export default class Consulta {
  static limiteTurno = 2;
  #pacienteID;
  #medicoID;
  #data;
  #diagnostico;
  #tratamento;
  #turno;

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

  setTurno(turno) {
    if (turno) {
      this.#turno = turno;
      return true;
    }
    return false;
  }

  getTurno() {
    return this.#turno;
  }

  static setLimiteTurno(lim) {
    if (typeof lim === "number"){
      Consulta.limiteTurno = lim
      return true
    }
    return false
  }

  static getLimiteTurno(){
    return Consulta.limiteTurno
  }
}