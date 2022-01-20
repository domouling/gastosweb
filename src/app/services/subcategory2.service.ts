import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class SubCategoryService2 {
    public url: string;
    public identity: any;
    public token: any;
    public subcategory2: any;

    constructor(
        public _http: HttpClient,
        private _router: Router
    ){
        this.url = global.url;
        this.identity = null;
        this.token = null;
    }

    add(subcategory2:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.post(this.url + 'subcategory2/add', subcategory2, {headers: headers});
    }

    update(subcategory2:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'subcategory2/update', subcategory2, {headers: headers});
    }

    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'subcategory2/all', {headers: headers});
    }

    getId(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'subcategory2/edit/' + id, {headers: headers});
    }

    getSubCatId(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'subcategory2/subcat/' + id, {headers: headers});
    }

    deleteSubcategory2(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());
        
        return this._http.delete(this.url+'subcategory2/delete/'+id, {headers: headers});
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