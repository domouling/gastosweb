import {
  Component,
  HostBinding,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  AfterViewInit,
  SimpleChanges} from '@angular/core';
/* import {AppService} from '@services/app.service'; */
import { Router } from '@angular/router';
import { CecoChoiceComponent } from '@pages/ceco/ceco-choice/ceco-choice.component';
import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { ExpenseService } from '@services/expense.service';
import { PaymentService } from '@services/payment.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    providers: [UserService, CecoService, ExpenseService, PaymentService]
})
export class MainComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'wrapper';

    public sidebarMenuOpened = true;

    public ceco: any = localStorage.getItem('ceco');
    public is_ceco: boolean;
    public cecox: string = '';

    public totexp: any;
    public totpay: any;
    public total: any;

    public counts = 0;

    //public suscripcion: Subscription;

    constructor(
      private renderer: Renderer2, /* private appService: AppService */
      private _userService: UserService,
      private _cecoService: CecoService,
      private _expenseService: ExpenseService,
      private _paymentService: PaymentService,
      public router: Router
    ) {}

    /* pruebatest2(resp){
      alert(resp);
    } */


    ngOnInit() {
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'login-page'
      );
      this.renderer.removeClass(
        document.querySelector('app-root'),
        'register-page'
      );

      /* console.log(this.counts);

      this._userService.pruebaEmitter.subscribe(() => {
        console.log('lo logre')
        this.counts = this.counts + 1;
        console.log('data')
      }) */

      this.getCeco();

    }

    ngOnDestroy(): void {
      //this.suscripcion.unsubscribe();
      //alert(this.counts)
    }


    /* ngAfterViewInit(): void {
        const prueba = this._userService.getCecoChoice();
        console.log(prueba)
        //console.log(this.choice.cecoName)
        //this.cecox = this.choice.test;
    } */


    toggleMenuSidebar() {
        if (this.sidebarMenuOpened) {
            this.renderer.removeClass(
                document.querySelector('app-root'),
                'sidebar-open'
            );
            this.renderer.addClass(
                document.querySelector('app-root'),
                'sidebar-collapse'
            );
            this.sidebarMenuOpened = false;
        } else {
            this.renderer.removeClass(
                document.querySelector('app-root'),
                'sidebar-collapse'
            );
            this.renderer.addClass(
                document.querySelector('app-root'),
                'sidebar-open'
            );
            this.sidebarMenuOpened = true;
        }
    }

    async getCeco(){

      if(this.ceco){
        (await this._userService.getIdentity()).subscribe(
            response => {
                if(response.status == 'success'){
                    if(response.data.role != 'ROLE_ADMIN'){
                        this.ceco = response.data.ceco_id;
                    }

                    this._cecoService.getId(this.ceco).subscribe(
                    response => {
                        if(response.ceco) {
                            this.cecox = response.ceco.centrocosto;
                            let body = {
                              ceco: this.ceco || 1,
                              desde: '2000-01-01',
                              hasta: '2050-12-31'
                          }
                            //console.log(this.cecox)
                            this._expenseService.totalCeco(body).subscribe(
                              response => {
                              if(response.status == 'success'){
                                  this.totexp = response.expenses[0].montotot;
                                  this._paymentService.totalCeco(body).subscribe(
                                    response => {
                                      if(response.status == 'success'){
                                        this.totpay = response.payments[0].montotot;
                                        let total:any = this.totpay - this.totexp;
                                        let tot = total;

                                        if(tot < 0 ) {

                                          (<HTMLInputElement>document.getElementById('cecox2')).classList.remove('bg-success');
                                          (<HTMLInputElement>document.getElementById('cecox2')).classList.add('bg-danger');

                                        } else {

                                          (<HTMLInputElement>document.getElementById('cecox2')).classList.remove('bg-danger');
                                          (<HTMLInputElement>document.getElementById('cecox2')).classList.add('bg-success');

                                        }

                                        total = total.toLocaleString('en') || '0';

                                        this.total = total;

                                        //(<HTMLInputElement>document.getElementById('cecox2')).innerHTML = 'SALDO ACTUAL: $CLP '+total;
                                      }
                                    },
                                    error => {
                                      console.log(error);
                                  })
                                }
                              },
                              error => {
                                console.log(error);
                              });
                        }
                    },
                    error => {
                        console.log(error);
                    });
                }
            },
            error => {
                console.log(error);
            }
        )

      }



  }
}
