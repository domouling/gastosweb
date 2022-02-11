import {Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
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
        this.datagastos();
        this.getChart();
    }
    
    async ngAfterViewInit(): Promise<void> {
    }

   datagastos() { //TODO
    this._expenseService.getExpenseMonth(this.ceco || 1).subscribe(
           response => {
               if (response.status == 'success') {
                   //console.log(response.expenses);
                   this.datax = response.expenses.map(res => parseInt(res.monto));

                   for (let i = response.expenses.length; i < 6; i++) {
                       this.datax[i] = 0;
                   }

               }
            }
        );
   }
   
   dataabonos() {
       this._paymentService.getPaymentMonth(this.ceco || 1).subscribe(
           response => {
               if(response.status == 'success'){

                   this.datay = response.payments.map(res => parseInt(res.monto));
                   
                   for (let i = response.payments.length; i < 6; i++) {
                       this.datay[i] = 0;
                   }
               }

            }
        );
    }

    private async getChart(): Promise<void>{

        this.datagastos();

        this.dataabonos();

        this.chart = new Chart('canvas', await {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Gastos',
                    data: this.datax,
                    //fill: false,
                    /* backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)'
                    ], */
                    /* borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)'
                    ], */
                    borderColor: 'rgb(0,128,192)',
                    tension: 0.1,
                    /* borderWidth: 1 */
                }, {
                    label: 'Abonos',
                    data: [this.datay],
                    //fill: false,
                    /* backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 205, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(153, 102, 255, 0.2)'
                    ], */
                    /* borderColor: [
                      'rgb(255, 99, 132)',
                      'rgb(255, 159, 64)',
                      'rgb(255, 205, 86)',
                      'rgb(75, 192, 192)',
                      'rgb(54, 162, 235)',
                      'rgb(153, 102, 255)'
                    ], */
                    borderColor: 'rgb(0,128,0)',
                    tension: 0.1,
                    /* borderWidth: 1 */
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
        });

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
