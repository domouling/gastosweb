export class Expense {
    constructor(
        public id: string,
        public categoria_id: string,
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
        public metodo: string,
        public proyecto_id: string,
        public monto: number,
        public montobase: number,
        public nombrecuenta: string,
        public proveedor_id: string,
        public tipogasto_id: string,
        public user_id: string,
        public ceco_id: string,
        public trxcurrency_id: string,
        public subcategoria2_id: string,
        public subcategoria_id: string,
        public unidadnegocio: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    )
    {}
}
