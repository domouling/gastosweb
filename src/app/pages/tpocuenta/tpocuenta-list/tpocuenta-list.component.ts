import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { TpoCuentaService } from '@services/tpocuenta.service';
import { global } from '@services/global';

@Component({
  selector: 'app-tpocuenta-list',
  templateUrl: './tpocuenta-list.component.html',
  styleUrls: ['./tpocuenta-list.component.scss'],
  providers: [UserService, TpoCuentaService]
})
export class TpocuentaListComponent implements OnInit, OnDestroy {

  public title: string;
  public tpocuentas: any;
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
    private _tpocuentaService: TpoCuentaService
  ) {
    this.title = 'Tipos de Cuenta';
    this.url = global.url;
    this.status = '';
    this.msg = '';
  }

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      scrollX: true,
      scrollY: "385px",
      scrollCollapse: true,
      responsive: true,
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getTpocuentas();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  getTpocuentas() {
    this._tpocuentaService.getAll().subscribe(
      response => {

        if(response.status == 'success') {
          this.tpocuentas = response.tpocuentas;
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

  deleteTpocuenta(id:number){
    this._tpocuentaService.deleteTpocuenta(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Tipo Cuenta eliminado con Exito";
        this.getTpocuentas();
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/tpocuenta']);
      },
      error => {
        this.msg = error.error.msg;
        this.status = 'error';
        if(error.status == 419){
          localStorage.removeItem('token');
          /* localStorage.removeItem('identity'); */
          setTimeout(() => this._router.navigate(['/login']), 1500);
        }
      }
    )
  }

}
