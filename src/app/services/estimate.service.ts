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
                                      .set('Authorization', this.getToken());

        return this._http.post(this.url + 'estimate/add', estimate, {headers: headers});
    }

    update(estimate:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'estimate/update', estimate, {headers: headers});
    }


    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'estimate/all', {headers: headers});
    }

    getId(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'estimate/edit/' + id, {headers: headers});
    }

    getTotals():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'estimate/totals', {headers: headers});
    }

    deleteEstimate(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());
        
        return this._http.delete(this.url+'estimate/delete/'+id, {headers: headers});
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

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')!);
        if(identity && identity != null && identity != undefined && identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null
        }

        return this.identity;
    }

    
}