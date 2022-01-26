import {Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js'


import { UserService } from '@services/user.service';
import { global } from '@services/global';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [UserService]
})
export class DashboardComponent implements OnInit {

    public url: string;
    public users: number;
    public chart: any;

   constructor(
        private _userService: UserService
    ){
        Chart.register(...registerables);
        this.url = global.url;
        this.users = 0;

    }

    ngOnInit(): void {
        this.getCountUsers();
        this.getChart();
    }

    getChart(){
        this.chart = new Chart('canvas', {
            type: 'line',
            data:{
                labels: ['Ene','Feb','Mar','Abr','May','Jun'],
                datasets: [{
                  label: 'Gastos',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
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
                  borderColor: 'rgb(72,192,192)',
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
        })
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

}
