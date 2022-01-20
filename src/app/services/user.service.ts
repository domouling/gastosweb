import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import {Router} from '@angular/router';
import { Observable } from "rxjs";
import { global } from "./global";

@Injectable()
export class UserService {
    public url: string;
    public identity: any;
    public token: any;
    public user: any;

    constructor(
        public _http: HttpClient,
        private _router: Router
    ){
        this.url = global.url;
        this.identity = null;
        this.token = null;
    }

    signup(user:any, gettoken:any = null):Observable<any> {
        if(gettoken != null) {
            user.gettoken = gettoken;
        }

        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', user, {headers: headers});
    }

    register(user:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'register', user, {headers: headers});
    }

    add(user:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.post(this.url + 'user/add', user, {headers: headers});
    }

    update(user:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'user/update', user, {headers: headers});
    }


    addAvatar(file: File):Observable<any>{
        let formParams = new FormData();
        formParams.append('file0', file);

        let headers = new HttpHeaders().set('Authorization', this.getToken());
        
        return this._http.post(this.url + 'user/upload-avatar', formParams, {headers: headers});
    }

    avatar(filename: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.get(this.url + 'user/avatar/' + filename, {headers: headers}); 
    }


    deleteAvatar(filename: string){
        let headers = new HttpHeaders().set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'user/delete-avatar/' + filename, {headers: headers});
    }


    updateImage(data: any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());

        return this._http.put(this.url + 'user/update-image', data, {headers: headers});
    }


    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'user/all', {headers: headers});
    }

    getUser(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('Authorization', this.getToken());
        
        return this._http.get(this.url + 'user/edit/' + id, {headers: headers});
    }

    deleteUser(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());
        
        return this._http.delete(this.url+'user/delete/'+id, {headers: headers});
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
    

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.user = null;
        this._router.navigate(['/login']);
    }


}