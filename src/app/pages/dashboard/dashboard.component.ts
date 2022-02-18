import {Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
    Chart,
    registerables,
    ChartDataset,
    ChartOptions,
    ChartConfiguration,
    ChartEvent,
    ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import moment, { Moment } from 'moment';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { ExpenseService } from '@services/expense.service';
import { PaymentService } from '@services/payment.service';
import { global } from '@services/global';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [UserService, CecoService, ExpenseService, PaymentService]
})
export class DashboardComponent implements OnInit, AfterViewInit {

    public url: string;
    public users: number;
    public cecos: any;
    public is_ceco: boolean;
    public chart: any;

    public showcart: boolean = false;
    public datax: any[] = [];
    public datay: any[] = [];


    /*  Data para prueba **/
    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [10,10,10,10,10,10],
                label: 'Gastos',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                fill: 'origin',
            },
            {
                data: [10,10,10,10,10,10],
                label: 'Abonos',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)',
                fill: 'origin',
            }
        ],
        labels: [ 'January', 'February', 'March', 'April', 'May', 'June' ]
    }

    public lineChartOptions: ChartConfiguration['options'] = {
        elements: {
          line: {
            tension: 0.5
          }
        },
        scales: {
          // We use this empty structure as a placeholder for dynamic theming.
          x: {},
          'y-axis-0':
            {
              position: 'left',
            },
          'y-axis-1': {
            position: 'right',
            grid: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              color: 'red'
            }
          }
        },

        plugins: {
          legend: { display: true },
        }
    };

    public lineChartType: ChartType = 'line';

    @ViewChild(BaseChartDirective) chartx?: BaseChartDirective;

    public ceco: number = parseInt(localStorage.getItem('ceco'));
    public today: any;
    public totexp: any;
    public totpay: any;

    public cecoName: string = '';

    constructor(
        private _userService: UserService,
        private _cecoService: CecoService,
        private _expenseService: ExpenseService,
        private _paymentService: PaymentService
    ){
        this.today = moment().format('DD/MM/YYYY');
        Chart.register(...registerables);
        this.url = global.url;
        this.users = 0;
        this.cecos = null;
        this.is_ceco = false;
        this.ceco =  parseInt(localStorage.getItem('ceco'));
    }

    ngOnInit(): void {
        this.getCountUsers();
        this.getCecos();
        this.totales();
        this.getCeco();
        //this.getChart();
    }

    async ngAfterViewInit(): Promise<void> {
        this.datagastos();
        this.dataabonos();
    }

   datagastos() { //TODO
    this._expenseService.getExpenseMonth(this.ceco || 1).subscribe(
           response => {
               if (response.status == 'success') {
                   //this.datax = response.expenses.map(res => parseInt(res.monto));

                   this.datax = [0,0,0,0,0,0];

                   for (let i = 0; i < response.expenses.length; i++) {
                    this.datax[response.expenses[i].mes - 1] = parseInt(response.expenses[i].monto);
                  }

               }

               this.lineChartData.datasets[0].data = this.datax;
               this.chartx?.update();
            }
        );
   }

   dataabonos() {
       this._paymentService.getPaymentMonth(this.ceco || 1).subscribe(
           response => {
               if(response.status == 'success'){
                    //this.datay = response.payments.map(res => parseInt(res.monto));
                    this.datay = [0,0,0,0,0,0];

                    //console.log(response)
                    for (let i = 0; i < response.payments.length; i++) {
                      this.datay[response.payments[i].mes - 1] = parseInt(response.payments[i].monto);
                    }

                   /* for (let i = response.payments.length; i < 6; i++) {
                       this.datay[i] = 0;
                   } */
               }

               this.lineChartData.datasets[1].data = this.datay;
               this.chartx?.update();
            }
        );
    }

    getCountUsers(){
        this._userService.getAll().subscribe(
            response => {
                if(response.users){
                    this.users = response.users.length;
                } else {
                    this.users = 0;
                }
            },
            error => {
                console.log(error);
            }
        )
    }

    putCeco(ceco_id:any){
        localStorage.setItem('ceco',ceco_id);
        this.is_ceco = true;
    }

    getCecos(){
        this._cecoService.getAll().subscribe(
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

    async getCeco(){

        (await this._userService.getIdentity()).subscribe(
            response => {
                if(response.status == 'success'){
                    if(response.data.role != 'ROLE_ADMIN'){
                        this.ceco = response.data.ceco_id;
                    }

                    this._cecoService.getId(this.ceco).subscribe(
                    response => {
                        if(response.ceco) {
                            this.cecoName = response.ceco.centrocosto;
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

    async totales(){
        (await this._userService.getIdentity()).subscribe(
            response => {
                if(response.status == 'success') {
                    if(response.data.role != 'ROLE_ADMIN'){
                        this.ceco = response.data.ceco_id;
                    }
                    let body = {
                        ceco: this.ceco || 1,
                        desde: '2022-01-01',
                        hasta: '2022-12-31'
                    }
                    this._expenseService.totalCeco(body).subscribe(
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
            },
            error => {
                console.log(error);
            }
        )
    }

}
