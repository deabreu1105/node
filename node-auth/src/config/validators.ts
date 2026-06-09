


// Aqui se pueden seguir agregando validadores para los campos de entrada, como email, password, etc.
export class Validators {

  
  static get email() {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  } 


}