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
                                      .set('auth-token', this.getToken());

        return this._http.post(this.url + 'subcategories2', subcategory2, {headers: headers});
    }

    update(id:any, subcategory2:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'subcategories2/' + id, subcategory2, {headers: headers});
    }

    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'subcategories2', {headers: headers});
    }

    getId(id: any):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'subcategories2/' + id, {headers: headers});
    }

    getSubCatId(id: any):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'subcategories2/subcat/' + id, {headers: headers});
    }

    deleteSubcategory2(id:any){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('auth-token', this.getToken());

        return this._http.delete(this.url+'subcategories2/'+id, {headers: headers});
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
