import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { TrxCurrencyService } from '@services/trxcurrency.service';
import { User } from '@/models/user';
import { Trxcurrency } from '@/models/trxcurrency';

import { global } from '@services/global';

@Component({
  selector: 'app-trxcurrency-edit',
  templateUrl: '../trxcurrency-new/trxcurrency-new.component.html',
  styleUrls: ['../trxcurrency-new/trxcurrency-new.component.scss'],
  providers: [UserService, TrxCurrencyService]
})
export class TrxcurrencyEditComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public trxcurrency: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _trxcurrencyService: TrxCurrencyService
  ) {
    this.trxcurrency = new Trxcurrency(null,'','','',1,'','');
    this.title = 'Tipo de Divisa';
    this.subtitle = 'Editar Divisa';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getTrxcurrency();
  }

  onSubmit(form:any){
    this._trxcurrencyService.update(this.trxcurrency.id, this.trxcurrency).subscribe(
      response => {
        if(response.status == 'success'){
          console.log(response);
          this.status = 'success';
          this.msg = 'Tipo Moneda Editado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/trxcurrency']);
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

  getTrxcurrency(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._trxcurrencyService.getId(id).subscribe(
        response => {
          if(response.trxcurrency) {
            this.trxcurrency = response.trxcurrency;
          } else {
            this._router.navigate(['/trxcurrency']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/trxcurrency']);  
        }
      );
    })
  }

}
