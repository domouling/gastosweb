import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { TpoCuentaService } from '@services/tpocuenta.service';
import { User } from '@/models/user';
import { Tpocuenta } from '@/models/tpocuenta';

import { global } from '@services/global';

@Component({
  selector: 'app-tpocuenta-edit',
  templateUrl: '../tpocuenta-new/tpocuenta-new.component.html',
  styleUrls: ['../tpocuenta-new/tpocuenta-new.component.scss'],
  providers: [UserService, TpoCuentaService]
})
export class TpocuentaEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public tpocuenta: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _tpocuentaService: TpoCuentaService
  ) {
    this.tpocuenta = new Tpocuenta(null,'',1,'','');
    this.title = 'Tipo de Cuenta';
    this.subtitle = 'Editar Tipo Cuenta';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getTpocuenta();
  }

  onSubmit(form:any){
    this._tpocuentaService.update(this.tpocuenta.id, this.tpocuenta).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Tipo Cuenta Editado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/tpocuenta']);
        }
      },
      error => {
        this.toastr.error(error.error.msg);
        this.status = 'error';
        if(error.status == 419){
          this._userService.logout();
        }
      }
    );
  }

  getTpocuenta(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._tpocuentaService.getId(id).subscribe(
        response => {
          if(response.tpocuenta) {
            this.tpocuenta = response.tpocuenta;
          } else {
            this._router.navigate(['/tpocuenta']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/tpocuenta']);  
        }
      );
    })
  }

}
