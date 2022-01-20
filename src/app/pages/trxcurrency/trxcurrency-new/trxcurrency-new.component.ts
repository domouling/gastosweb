import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { TrxCurrencyService } from '@services/trxcurrency.service';
import { User } from '@/models/user';
import { Trxcurrency } from '@/models/trxcurrency';

import { global } from '@services/global';

@Component({
  selector: 'app-trxcurrency-new',
  templateUrl: './trxcurrency-new.component.html',
  styleUrls: ['./trxcurrency-new.component.scss'],
  providers: [UserService, TrxCurrencyService]
})
export class TrxcurrencyNewComponent implements OnInit {

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
    this.trxcurrency = new Trxcurrency(1,'','','',1,'','');
    this.title = 'Tipo de Divisa';
    this.subtitle = 'Divisa Nueva';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._trxcurrencyService.add(this.trxcurrency).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Tipo Moneda creada con exito!';
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

}
