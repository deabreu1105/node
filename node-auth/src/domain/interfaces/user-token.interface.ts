// Interfaz que define la respuesta que retornan los casos de uso de autenticación.
// Se ubica en domain/interfaces para ser compartida entre todos los use-cases
// sin duplicar su definición.
export interface UserToken {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
