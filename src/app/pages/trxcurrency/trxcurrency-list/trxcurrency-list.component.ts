import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { TrxCurrencyService } from '@services/trxcurrency.service';
import { global } from '@services/global';

@Component({
  selector: 'app-trxcurrency-list',
  templateUrl: './trxcurrency-list.component.html',
  styleUrls: ['./trxcurrency-list.component.scss'],
  providers: [UserService, TrxCurrencyService]
})
export class TrxcurrencyListComponent implements OnInit, OnDestroy {

  public title: string;
  public trxcurrencies: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _trxcurrencyService: TrxCurrencyService
  ) {
    this.title = 'Divisas';
    this.url = global.url;
    this.status = '';
    this.msg = '';
  }

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: false,
      scrollY: "385px",
      scrollCollapse: true,
      responsive: true,
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getTrxcurrencies();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getTrxcurrencies() {
    this._trxcurrencyService.getAll().subscribe(
      response => {

        if(response.status == 'success') {
          this.trxcurrencies = response.data;
          this.dtTrigger.next(null);
        }
      },
      error => {
        this.toastr.error(error.error.msg);
        this.status = 'error';
        if(error.status == 419){
          this._userService.logout();
          setTimeout(() => this._router.navigate(['/login']), 1500);
        }
      }
    )
  }

  deleteTrxcurrency(id:number){
    this._trxcurrencyService.deleteTrxcurrency(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Usuario eliminado con Exito";
        this.getTrxcurrencies();
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/trxcurrency']);
      },
      error => {
        this.msg = error.error.msg;
        this.status = 'error';
        if(error.status == 419){
          localStorage.removeItem('token');
          localStorage.removeItem('identity');
          setTimeout(() => this._router.navigate(['/login']), 1500);
        }
      }
    )
  }

}
