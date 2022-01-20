import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class CecoService {
    public url: string;
    public identity: any;
    public token: any;
    public ceco: any;

    constructor(
        public _http: HttpClient,
        private _router: Router
    ){
        this.url = global.url;
        this.identity = null;
        this.token = null;
    }

    add(ceco:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.post(this.url + 'ceco/add', ceco, {headers: headers});
    }

    update(ceco:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'ceco/update', ceco, {headers: headers});
    }


    addAvatar(file: File):Observable<any>{
        let formParams = new FormData();
        formParams.append('file0', file);

        let headers = new HttpHeaders().set('Authorization', this.getToken());
        
        return this._http.post(this.url + 'ceco/upload-avatar', formParams, {headers: headers});
    }

    avatar(filename: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.get(this.url + 'ceco/avatar/' + filename, {headers: headers}); 
    }


    deleteAvatar(filename: string){
        let headers = new HttpHeaders().set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'ceco/delete-avatar/' + filename, {headers: headers});
    }


    updateImage(data: any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'ceco/update-image', data, {headers: headers});
    }


    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'ceco/all', {headers: headers});
    }

    getId(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'ceco/edit/' + id, {headers: headers});
    }

    deleteCeco(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());
        
        return this._http.delete(this.url+'ceco/delete/'+id, {headers: headers});
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