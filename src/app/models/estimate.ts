export class Estimate {
    constructor(
        public id: string,
        public fechainicio: string,
        public fechafin: string,
        public montoctacorriente: number,
        public montolineacredito: number,
        public montotrjcredito: number,
        public montototal: number,
        public montototalbase: number,
        public temporalidad: string,
        public tipogastogen: number,
        public ceco_id: string,
        public trxcurrency_id: string,
        public unidadnegocio: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}
