export class Project {
    constructor(
        public id: string,
        public nombre: string,
        public fechainicio: string,
        public fechafin: string,
        public monto: number,
        public montopag: number,
        public user_id: string,
        public proveedor_id: string,
        public ceco_id: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}
