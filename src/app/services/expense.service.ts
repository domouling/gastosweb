import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class ExpenseService {
    public url: string;
    public identity: any;
    public token: any;
    public expense: any;

    constructor(
        public _http: HttpClient,
        private _router: Router
    ){
        this.url = global.url;
        this.identity = null;
        this.token = null;
    }

    add(expense:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.post(this.url + 'expenses', expense, {headers: headers});
    }

    update(id:number, expense:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'expenses/' + id, expense, {headers: headers});
    }

    putSaldo(id:number, data:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'projects/saldo/pag/' + id, data, {headers: headers});
    }

    addAvatar(file: File):Observable<any>{
        let formParams = new FormData();
        formParams.append('image', file);

        let headers = new HttpHeaders().set('auth-token', this.getToken());

        return this._http.post(this.url + 'expenses/archivo/upload', formParams, {headers: headers});
    }

    avatar(filename: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'expenses/file/' + filename, {headers: headers});
    }


    deleteAvatar(filename: string){
        let headers = new HttpHeaders().set('auth-token', this.getToken());

        return this._http.get(this.url + 'expenses/delete-avatar/' + filename, {headers: headers});
    }


    updateImage(data: any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'expenses/archivo/update', data, {headers: headers});
    }


    getAll(ceco: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'expenses/all/' + ceco, {headers: headers});
    }

    getMovements(ceco: number, data: any):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.post(this.url + 'expenses/movements/all/' + ceco, data, {headers: headers});
    }

    totalCeco(data: any):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.post(this.url + 'expenses/total/ceco', data, {headers: headers});
    }


    getExpense(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'expenses/' + id, {headers: headers});
    }

    getExpenseMonth(ceco: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'expenses/total/month/' + ceco, {headers: headers});
    }

    deleteExpense(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('auth-token', this.getToken());

        return this._http.delete(this.url+'expenses/'+id, {headers: headers});
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token && token != null && token != undefined && token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    async getIdentity():Promise<Observable<any>> {

        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('auth-token', this.getToken());
        return await this._http.get(this.url + 'users/token/info', {headers: headers});
    }

}
