import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { TipoGastoService } from '@services/tipogasto.service';
import { CecoService } from '@services/ceco.service';
import { TrxCurrencyService } from '@services/trxcurrency.service';
import { EstimateService } from '@services/estimate.service';
import { Estimate } from '@/models/estimate';

import { global } from '@services/global';

@Component({
  selector: 'app-budget-new',
  templateUrl: './budget-new.component.html',
  styleUrls: ['./budget-new.component.scss'],
  providers: [UserService, TipoGastoService, CecoService, TrxCurrencyService, EstimateService]
})
export class BudgetNewComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public estimate: any;
  public tipogastos: any;
  public cecos: any;
  public monedas: any;
  public status: string;
  public url: string;
  public msg: string;
  public error: any;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _tipogastoService: TipoGastoService,
    private _cecoService: CecoService,
    private _trxcurrencyService: TrxCurrencyService,
    private _estimateService: EstimateService
  ) {
    this.estimate = new Estimate(1,'','',0,0,0,0,0,'',1,1,1,'',1,'','');
    this.title = 'Prespuestos';
    this.subtitle = 'Nuevo Presupuesto';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
  }

  ngOnInit(): void {
    this.getTipogastos();
    this.getCecos();
    this.getMonedas();
  }

  onSubmit(form:any){
    this._estimateService.add(this.estimate).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Presupuesto creado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/estimate']);
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

  getTipogastos(){
    this._tipogastoService.getAll().subscribe(
      response => {
        if(response.data){
          this.tipogastos = response.data;
        }
      },
      error => {
        console.log(error.status);
        this.error = error.status;
        if(error.status == 419){
          this._userService.logout();
        }
      }
    );
  }

  getCecos(){
    this._cecoService.getAll().subscribe(
      response => {
        if(response.data){
          this.cecos = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  getMonedas(){
    this._trxcurrencyService.getAll().subscribe(
      response => {
        if(response.data){
          this.monedas = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

}
