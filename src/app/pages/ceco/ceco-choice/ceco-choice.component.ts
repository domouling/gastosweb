import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { ExpenseService } from '@services/expense.service';
import { PaymentService } from '@services/payment.service';

import { global } from '@services/global';

@Component({
  selector: 'app-ceco-choice',
  templateUrl: './ceco-choice.component.html',
  styleUrls: ['./ceco-choice.component.scss'],
  providers: [UserService, CecoService, ExpenseService, PaymentService]
})
export class CecoChoiceComponent implements OnInit {

  @Input() child_id;

  public url: string;
  public users: number;
  public cecos: any;
  public ceco: any;
  public cecoName: string;
  public message: string;
  public editMessage: string;

  public totexp: any;
  public totpay: any;

  constructor(
    private _userService: UserService,
    private _cecoService: CecoService,
    private _expenseService: ExpenseService,
    private _paymentService: PaymentService,
    private _router: Router
  ) {
    this.url = global.url;
  }

  ngOnInit(): void {

    this.getCecos();
  }

  async getCecos(){
    this._cecoService.getAllAct().subscribe(
        response => {
            if (response.cecos) {
                this.cecos = response.cecos;
            }
        },
        error => {
            console.log(error);
            if (error.status == 419) {
                this._userService.logout();
            }
        }
    )
  }

  selectCeco(id:any, ceco:any){
    this.cecoName = ceco;
    //console.log(this.cecoName)
    localStorage.setItem('ceco',id);
    (<HTMLInputElement>document.getElementById('cecox')).innerHTML = 'CECO: '+ceco;

    let body = {
        ceco: id,
        desde: '2000-01-01',
        hasta: '2050-12-31'
    }

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
                  total = total.toLocaleString('en') || '0';

                  if(tot < 0 ) {

                    (<HTMLInputElement>document.getElementById('cecox2')).classList.remove('bg-success');
                    (<HTMLInputElement>document.getElementById('cecox2')).classList.add('bg-danger');

                  } else {

                    (<HTMLInputElement>document.getElementById('cecox2')).classList.remove('bg-danger');
                    (<HTMLInputElement>document.getElementById('cecox2')).classList.add('bg-success');

                  }
                  (<HTMLInputElement>document.getElementById('cecox2')).innerHTML = 'SALDO ACTUAL: $CLP '+total;
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

    //this._userService.cambio(ceco);
    this._router.navigate(['/']);
  }

}
