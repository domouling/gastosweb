import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { TipoGastoService } from '@services/tipogasto.service';
import { User } from '@/models/user';
import { Tipogasto } from '@/models/tipogasto';

import { global } from '@services/global';

@Component({
  selector: 'app-tipogasto-edit',
  templateUrl: '../tipogasto-new/tipogasto-new.component.html',
  styleUrls: ['../tipogasto-new/tipogasto-new.component.scss'],
  providers: [UserService, TipoGastoService]
})
export class TipogastoEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public tipogasto: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _tipogastoService: TipoGastoService
  ) {
    this.tipogasto = new Tipogasto(null,'',1,'','');
    this.title = 'Tipo de Gasto';
    this.subtitle = 'Editar Tipo Gasto';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
  }

  ngOnInit(): void {
    this.getTipogasto();
  }

  onSubmit(form:any){
    this._tipogastoService.update(this.tipogasto.id, this.tipogasto).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Tipo Gasto Editado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/admin/tipogasto']);
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

  getTipogasto(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._tipogastoService.getId(id).subscribe(
        response => {
          if(response.tpogasto) {
            this.tipogasto = response.tpogasto;
          } else {
            this._router.navigate(['/admin/tipogasto']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/admin/tipogasto']);
        }
      );
    })
  }

}
