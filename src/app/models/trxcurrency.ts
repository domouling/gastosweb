export class Trxcurrency {
    constructor(
        public id: string,
        public isocode: string,
        public nombre: string,
        public simbolo: string,
        public status: number,
        public created_at: string,
        public updated_at: string
    ){}
}
