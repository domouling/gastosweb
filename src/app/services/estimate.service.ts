import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class EstimateService {
    public url: string;
    public identity: any;
    public token: any;
    public estimate: any;

    constructor(
        public _http: HttpClient,
        private _router: Router
    ){
        this.url = global.url;
        this.identity = null;
        this.token = null;
    }

    add(estimate:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.post(this.url + 'estimates', estimate, {headers: headers});
    }

    update(id: number, estimate:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'estimates/' + id, estimate, {headers: headers});
    }


    getAll(ceco: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'estimates/all/' + ceco, {headers: headers});
    }

    getId(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'estimates/' + id, {headers: headers});
    }

    getTotals():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'estimates/totales/total', {headers: headers});
    }

    deleteEstimate(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('auth-token', this.getToken());
        
        return this._http.delete(this.url+'estimates/'+id, {headers: headers});
    }

    addAvatar(file: File):Observable<any>{
        let formParams = new FormData();
        formParams.append('image', file);

        let headers = new HttpHeaders().set('auth-token', this.getToken());
        
        return this._http.post(this.url + 'estimates/archivo/upload', formParams, {headers: headers});
    }

    avatar(filename: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'estiamtes/file/' + filename, {headers: headers}); 
    }


    deleteAvatar(filename: string){
        let headers = new HttpHeaders().set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'estimates/delete-avatar/' + filename, {headers: headers});
    }


    updateImage(data: any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'estimates/image/update', data, {headers: headers});
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