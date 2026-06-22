
// Validadores reutilizables para los DTOs del domain.
// Al centralizar las expresiones regulares aquí, evitamos duplicarlas en cada DTO.
export class Validators {

  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  }

}