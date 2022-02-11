export class Payment {
    constructor(
        public id: number,
        public descripcion: string,
        public monto: number,
        public fecha: string,
        public user_id: number,
        public ceco_id: number,
        public proyecto_id: number,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}