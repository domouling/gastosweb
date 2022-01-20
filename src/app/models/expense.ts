export class Expense {
    constructor(
        public id: number,
        public categoria_id: number,
        public usar_ccard: number,
        public cuotas: string,
        public descripcion: string,
        public status_aprobmonto: string,
        public fechaprimerpago: string,
        public fechainicio: string,
        public fechafin: string,
        public gastosasoc: number,
        public imagen: string,
        public mailregistro: string,
        public metodo: number,
        public monto: number,
        public montobase: number,
        public nombrecuenta: string,
        public proveedor_id: number,
        public tipogasto_id: number,
        public user_id: number,
        public ceco_id: number,
        public trxcurrency_id: number,
        public subcategoria2_id: number,
        public subcategoria_id: number,
        public unidadnegocio: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    )
    {}
}