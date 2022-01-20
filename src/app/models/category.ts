export class Category {
    constructor(
        public id: number,
        public jerarquia: number,
        public nombre: string,
        public unidadnegocio: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}