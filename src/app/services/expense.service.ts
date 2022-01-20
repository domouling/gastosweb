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
                                      .set('Authorization', this.getToken());

        return this._http.post(this.url + 'expense/add', expense, {headers: headers});
    }

    update(expense:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'expense/update', expense, {headers: headers});
    }


    addAvatar(file: File):Observable<any>{
        let formParams = new FormData();
        formParams.append('file0', file);

        let headers = new HttpHeaders().set('Authorization', this.getToken());
        
        return this._http.post(this.url + 'expense/upload-avatar', formParams, {headers: headers});
    }

    avatar(filename: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.get(this.url + 'expense/avatar/' + filename, {headers: headers}); 
    }


    deleteAvatar(filename: string){
        let headers = new HttpHeaders().set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'expense/delete-avatar/' + filename, {headers: headers});
    }


    updateImage(data: any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'expense/update-image', data, {headers: headers});
    }


    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'expense/all', {headers: headers});
    }

    getExpense(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'expense/edit/' + id, {headers: headers});
    }

    deleteExpense(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());
        
        return this._http.delete(this.url+'expense/delete/'+id, {headers: headers});
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