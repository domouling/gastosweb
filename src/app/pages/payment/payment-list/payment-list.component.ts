import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { PaymentService } from '@services/payment.service';
import { global } from '@services/global';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss'],
  providers: [UserService, PaymentService, CecoService]
})
export class PaymentListComponent implements OnInit, OnDestroy {

  public title: string;
  public payments: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;
  public ceco: any;
  //public cecoName: string = '';

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _cecoService: CecoService,
    private _paymentService: PaymentService
  ) {
    this.title = 'Abonos';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.ceco =  localStorage.getItem('ceco');
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

    this.getPayments(this.ceco);
    //this.getCeco();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  getPayments(ceco:number) {
    this._paymentService.getAll(ceco).subscribe(
      response => {
        console.log(response);
        if(response.status == 'success') {
          this.payments = response.payments;
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

  deletePayment(id:number){
    this._paymentService.deletePayment(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Abono eliminado con Exito";
        this.getPayments(this.ceco);
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

  /* getCeco(){
    this._cecoService.getId(this.ceco).subscribe(
    response => {
        if(response.ceco) {
            console.log(response.ceco);
            this.cecoName = response.ceco.centrocosto;
            /* if(this.ceco.imagen){
                this.first = this.ceco.imagen;
            }
            this.fileName = this.ceco.imagen;
        } /* else {
            this._router.navigate(['/ceco']);
        }
    },
    error => {
        console.log(error);
    });
  } */

}
