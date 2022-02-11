import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service'; 
import { global } from '@services/global';

@Component({
  selector: 'app-ceco-choice',
  templateUrl: './ceco-choice.component.html',
  styleUrls: ['./ceco-choice.component.scss'],
  providers: [UserService, CecoService]
})
export class CecoChoiceComponent implements OnInit {

  public url: string;
  public users: number;
  public cecos: any;
  public ceco: any;
  public message: string;
  public editMessage: string;

  constructor(
    private _userService: UserService,
    private _cecoService: CecoService,
    private _router: Router
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getCecos();
  }

  async getCecos(){
    this._cecoService.getAllAct().subscribe(
        response => {
            if (response.cecos) {
                this.cecos = response.cecos;
            }
        },
        error => {
            console.log(error);
            if (error.status == 419) {
                this._userService.logout();
            }
        }
    )
  }

  selectCeco(id:any, ceco:any){
    console.log(ceco);
    localStorage.setItem('ceco',id);
    /* this._userService.cambio(ceco); */
    this._userService.cambio(ceco);
    this._router.navigate(['/']);
  }

}
