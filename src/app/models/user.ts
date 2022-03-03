export class User {
    constructor(
        public id: string,
        public nombre: string,
        public password: string,
        public passnew: string,
        public retypePassword: string,
        public role: string,
        public status: number,
        public email: string,
        public imagen: string,
        public ceco_id: string,
        public ultimasesion: string,
        public created_at: string,
        public updated_at: string
    ){}
}
