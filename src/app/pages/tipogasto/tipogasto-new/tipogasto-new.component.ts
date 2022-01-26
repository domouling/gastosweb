import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { TipoGastoService } from '@services/tipogasto.service';
import { User } from '@/models/user';
import { Tipogasto } from '@/models/tipogasto';

import { global } from '@services/global';

@Component({
  selector: 'app-tipogasto-new',
  templateUrl: './tipogasto-new.component.html',
  styleUrls: ['./tipogasto-new.component.scss'],
  providers: [UserService, TipoGastoService]
})
export class TipogastoNewComponent implements OnInit {

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
    this.subtitle = 'Tipo Gasto Nuevo';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._tipogastoService.add(this.tipogasto).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Tipo Gasto creada con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/tipogasto']);
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
