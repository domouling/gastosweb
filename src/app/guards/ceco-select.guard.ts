import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class CecoSelectGuard implements CanActivate {
  public user: any;

  constructor(
    private _router: Router,
    private _userService: UserService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
        | Observable<boolean | UrlTree> 
        | Promise<boolean | UrlTree> 
        | boolean 
        | UrlTree {

    if(this.getInfo()){
      return true;
    } else {
      return false;
    }
  }

  async getInfo(){
    let ceco = localStorage.getItem('ceco');

    (await this._userService.getIdentity()).subscribe(
      response => {
          this.user = response.data;
          if(ceco){
            if(ceco != this.user.ceco_id && this.user.role != 'ROLE_ADMIN'){
              localStorage.setItem('ceco',this.user.ceco_id);
              this._router.navigate(['/']);
              return false;
            } else {
              return true;
            }
          } else {
            if(this.user.role != 'ROLE_ADMIN'){
              localStorage.setItem('ceco',this.user.ceco_id);
              this._router.navigate(['/']);
              return false;
            } else {
              this._router.navigate(['/choice']);
              return false;
            }
          }
      },
      error => {
        return false;
      }
    )
    
  }
  
}
