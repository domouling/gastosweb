export class Payment {
    constructor(
        public id: string,
        public descripcion: string,
        public monto: number,
        public fecha: string,
        public user_id: string,
        public ceco_id: string,
        public proyecto_id: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}
