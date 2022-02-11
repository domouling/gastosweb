import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment, { Moment } from 'moment';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { ExpenseService } from '@services/expense.service';
import { PaymentService } from '@services/payment.service';
import { global } from '@services/global';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss'],
  providers: [UserService, ExpenseService, CecoService, PaymentService]
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  public title: string;
  public expenses: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;
  public ceco: number;
  public cecoName: string = '';

  public desde: any;
  public hasta: any;

  public totexp: any;
  public totpay: any;

  public dtOptions: any;
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _cecoService: CecoService,
    private _expenserService: ExpenseService,
    private _paymentService: PaymentService
  ) {
    this.title = 'Movimientos';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.ceco = parseInt(localStorage.getItem('ceco'));

    this.desde = moment('2022-01-01').format('YYYY-MM-DD');
    this.hasta = moment('2022-12-31').format('YYYY-MM-DD');
  }

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      scrollX: false,
      scrollY: "385px",
      scrollCollapse: true,
      responsive: true,
      columnDefs: [
        {
          targets: 'nosort',
          orderable: false
        }
      ],
      dom: 'lBfrtip',
      buttons: [ 
        {
          extend: 'excel',
          text: '<i class="far fa-file-excel"></i>',
          className: "btn btn-sm btn-success ml-3 excelBtn",
          titleAttr: 'Exportar a Excel',
          exportOptions: {
            columns: ':not(.notexport)'
          }
        },
        {
          extend: 'pdf',
          text: '<i class="far fa-file-pdf"></i>',
          className: "btn btn-sm btn-danger pdfBtn",
          titleAttr: 'Exportar a PDF',
          exportOptions: {
            columns: ':not(.notexport)'
          }
        },
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i>',
          className: "btn btn-sm btn-primary printBtn",
          titleAttr: 'Imprimir',
          exportOptions: {
            columns: ':not(.notexport)'
          }
        }
        ],
      /* footerCallback:
        function () {
          let api = this.api();
          let total = api.column(6).data()
                               .flatten()
                               .reduce( function (a,b) {
                                    b = b.replace(/[^\d.-]/g, '') * 1;
                                    let x = parseInt(a) || 0;
                                    let y = parseInt(b) || 0;
                                    return x + y;
                                   }, 0);
          total = '$' + new Intl.NumberFormat('es-MX').format(total);
          $( api.columns(6).footer() ).html( 'Tot: ' + total );
        }
      , */
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getExpenses(this.ceco);
    this.getCeco();
    this.totales();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getExpenses(ceco: number) {
    let desde = (<HTMLInputElement>document.getElementById('fechaini')).value || '2022-01-01';
    let hasta = (<HTMLInputElement>document.querySelector('#fechafin')).value || '2022-12-31';
    let body = {
      desde: desde,
      hasta: hasta
    }

    /* console.log(body); */

    this._expenserService.getMovements(ceco,body).subscribe(
      response => {
        if(response.status == 'success') {
          this.expenses = response.expenses;
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

  deleteExpense(id:number){
    this._expenserService.deleteExpense(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Movimiento eliminado con Exito";
        this.getExpenses(this.ceco);
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/expense']);
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

  deletePayment(id:number){
    this._paymentService.deletePayment(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Abono eliminado con Exito";
        this.getExpenses(this.ceco);
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/expense']);
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

  getCeco(){
    this._cecoService.getId(this.ceco).subscribe(
    response => {
        if(response.ceco) {
            this.cecoName = response.ceco.centrocosto;
            /* if(this.ceco.imagen){
                this.first = this.ceco.imagen;
            }
            this.fileName = this.ceco.imagen; */
        } /* else {
            this._router.navigate(['/ceco']);
        } */
    },
    error => {
        console.log(error);
    });
  }

  totales(){
    let desde = (<HTMLInputElement>document.getElementById('fechaini')).value || '2022-01-01';
    let hasta = (<HTMLInputElement>document.querySelector('#fechafin')).value || '2022-12-31';

    let body = {
      ceco: this.ceco,
      desde: desde,
      hasta: hasta
    }

    this._expenserService.totalCeco(body).subscribe(
      response => {
        if(response.status == 'success'){
          this.totexp = response.expenses[0].montotot;
        }
      },
      error => {
        console.log(error);
    });

    this._paymentService.totalCeco(body).subscribe(
      response => {
        if(response.status == 'success'){
          this.totpay = response.payments[0].montotot;
        }
      },
      error => {
        console.log(error);
    });

  }

  onInitChange(){
    let desde = (<HTMLInputElement>document.getElementById('fechaini')).value;
    let hasta = (<HTMLInputElement>document.querySelector('#fechafin')).value;
    let body;
    if(desde <= hasta) { 
      body = {
        desde: (<HTMLInputElement>document.getElementById('fechaini')).value,
        hasta: (<HTMLInputElement>document.getElementById('fechafin')).value
      }
    } else {
      
      body = {
        desde: '2022-01-01',
        hasta: '2022-12-31'
      };

      (<HTMLInputElement>document.getElementById('fechaini')).value = '2022-01-01';
      (<HTMLInputElement>document.getElementById('fechafin')).value = '2022-12-31';

      alert('Valide las Fecha de Inicio y Final');
    }
    this._expenserService.getMovements(this.ceco,body).subscribe(
      response => {
        if(response.status == 'success') {
          this.expenses = response.expenses;

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
          });

          this.totales();
          //this.dtTrigger.next(null);
          //this.dtTrigger.unsubscribe(); 
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

  onEndChange(){
    let desde = (<HTMLInputElement>document.getElementById('fechaini')).value;
    let hasta = (<HTMLInputElement>document.querySelector('#fechafin')).value;
    if(desde <= hasta) {
      alert('Perfect');
    } else {
      alert('POHOHOHO');
    }
  }


}
