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

        return this._http.post(this.url+'users/login', user, {headers: headers, observe: 'response'});
    }

    register(user:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'users/register', user, {headers: headers});
    }

    add(user:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.post(this.url + 'users', user, {headers: headers});
    }

    update(id:number, user:any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'users/'  + id, user, {headers: headers});
    }


    addAvatar(file: File):Observable<any>{
        let formParams = new FormData();
        formParams.append('image', file);

        let headers = new HttpHeaders().set('auth-token', this.getToken());
        
        return this._http.post(this.url + 'users/upload-avatar', formParams, {headers: headers});
    }

    avatar(filename: string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.get(this.url + 'users/file/' + filename, {headers: headers}); 
    }


    deleteAvatar(filename: string){
        let headers = new HttpHeaders().set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'users/delete-avatar/' + filename, {headers: headers});
    }


    updateImage(data: any):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());

        return this._http.put(this.url + 'users/image/update', data, {headers: headers});
    }


    getAll():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'users', {headers: headers});
    }

    getUser(id: number):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                      .set('auth-token', this.getToken());
        
        return this._http.get(this.url + 'users/' + id, {headers: headers});
    }

    deleteUser(id:number){
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('auth-token', this.getToken());
        
        return this._http.delete(this.url+'users/'+id, {headers: headers});
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
        /* let identity = JSON.parse(localStorage.getItem('identity')!);
        if(identity && identity != null && identity != undefined && identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null
        }

        return this.identity; */
        
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('auth-token', this.getToken());
        return await this._http.get(this.url + 'users/token/info', {headers: headers});
    }
    

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('identity');
        this.user = null;
        this._router.navigate(['/login']);
    }


}