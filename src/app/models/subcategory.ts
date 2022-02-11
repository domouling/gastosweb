export class SubCategory {
    constructor(
        public id: number,
        public nombre: string,
        public categoria_id: number,
        public jerarquiasubcatpcpal: number,
        public jerarquiasubcat: number,
        public numjerarsubcat: number,
        public unidadnegocio: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}