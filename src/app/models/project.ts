export class Project {
    constructor(
        public id: number,
        public nombre: string,
        public fechainicio: string,
        public fechafin: string,
        public monto: number,
        public montopag: number,
        public proveedor_id: number,
        public ceco_id: number,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}