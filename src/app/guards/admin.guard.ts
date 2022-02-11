import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '@services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  public user: any;

  constructor(
    private _userService: UserService,
    private _router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.getInfo()){
      return true;
    } else {
      this._router.navigate(['/']);
      return false;
    }

  }

  async getInfo(){
    (await this._userService.getIdentity()).subscribe(
      response => {
        if(response.status == 'success'){
          this.user = response.data;
          if(this.user.role === "ROLE_ADMIN"){
            return true;
          } else {
            this._router.navigate(['/']);
            return false;
          }
        }
      },
      error => {
        this._router.navigate(['/']);
        return false;
      }
    )
  }
  
}
