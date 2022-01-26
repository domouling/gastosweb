import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { TpoCuentaService } from '@services/tpocuenta.service';
import { User } from '@/models/user';
import { Tpocuenta } from '@/models/tpocuenta';

import { global } from '@services/global';

@Component({
  selector: 'app-tpocuenta-new',
  templateUrl: './tpocuenta-new.component.html',
  styleUrls: ['./tpocuenta-new.component.scss'],
  providers: [UserService, TpoCuentaService]
})
export class TpocuentaNewComponent implements OnInit {

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
    this.subtitle = 'Tipo Cuenta Nueva';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._tpocuentaService.add(this.tpocuenta).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Tipo Cuenta creada con exito!';
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

}
