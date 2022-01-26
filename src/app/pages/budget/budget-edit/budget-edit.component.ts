import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment, { Moment } from 'moment';

import { UserService } from '@services/user.service';
import { TipoGastoService } from '@services/tipogasto.service';
import { CecoService } from '@services/ceco.service';
import { TrxCurrencyService } from '@services/trxcurrency.service';
import { EstimateService } from '@services/estimate.service';
import { Estimate } from '@/models/estimate';

import { global } from '@services/global';

@Component({
  selector: 'app-budget-edit',
  templateUrl: '../budget-new/budget-new.component.html',
  styleUrls: ['../budget-new/budget-new.component.scss'],
  providers: [UserService, TipoGastoService, CecoService, TrxCurrencyService, EstimateService]
})
export class BudgetEditComponent implements OnInit {

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
    this.estimate = new Estimate(null,'','',0,0,0,0,0,'',1,1,1,null,1,'','');
    this.title = 'Presupuestos';
    this.subtitle = 'Editar Presupuesto';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getTipogastos();
    this.getCecos();
    this.getMonedas();
    this.getEstimate();
  }

  onSubmit(form:any){
    this._estimateService.update(this.estimate.id, this.estimate).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Presupuesto Actualizado con exito!';
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

  getEstimate(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._estimateService.getId(id).subscribe(
        response => {
          if(response.estimate){
            this.estimate = response.estimate;
            this.estimate.fechainicio = moment(this.estimate.fechainicio).format('YYYY-MM-DD');
            this.estimate.fechafin = moment(this.estimate.fechafin).format('YYYY-MM-DD');

          } else {
            this._router.navigate(['/estimate']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/estimate'])
        }
      )
    })
  }

  getTipogastos(){
    this._tipogastoService.getAll().subscribe(
      response => {
        if(response.tpogastos){
          this.tipogastos = response.tpogastos;
        }
      },
      error => {
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
        if(response.cecos){
          this.cecos = response.cecos;
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
        if(response.trxcurrencies){
          this.monedas = response.trxcurrencies;
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
