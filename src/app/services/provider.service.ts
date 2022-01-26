import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class ProviderService {
    public url: string;
    public identity: any;
    public token: any;
    public provider: any;

    constructor(
        public _http: HttpClient,
        private _router: Router
    ){
        this.url = global.url;
        this.identity = null;
        this.token = null;
    }

    add(provider:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.post(this.url + 'providers', provider, {headers: headers});
    }

    update(id:number, provider:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'providers/' + id, provider, {headers: headers});
    }

    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'providers', {headers: headers});
    }

    getId(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'providers/' + id, {headers: headers});
    }

    deleteProvider(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('auth-token', this.getToken());
        
        return this._http.delete(this.url+'providers/'+id, {headers: headers});
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