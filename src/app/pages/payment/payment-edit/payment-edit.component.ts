import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment, { Moment } from 'moment';


import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { ProjectService } from '@services/project.service';
import { PaymentService } from '@services/payment.service';

import { Payment } from '@/models/payment';

import { global } from '@services/global';

@Component({
  selector: 'app-payment-new',
  templateUrl: '../payment-new/payment-new.component.html',
  styleUrls: ['../payment-new/payment-new.component.scss'],
  providers: [UserService, CecoService, ProjectService, PaymentService]
})
export class PaymentEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public today: any;
  public payment: any;
  public cecos: any;
  public projects: any;
  public users: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  public ceco: number;
  public cecoName: string = '';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _cecoService: CecoService,
    private _projectService: ProjectService,
    private _paymentService: PaymentService
  ) {
    this.ceco =  parseInt(localStorage.getItem('ceco'));

    this.today = moment().format('YYYY-MM-DD');

    this.payment = new Payment(null,'',0,'',1,this.ceco,0,1,'','');
    this.title = 'Abonos';
    this.subtitle = 'Editar Abono';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getCecos();
    this.getCeco();
    this.getUsers();
    this.getProjects();
    this.getPayment();
  }

  onSubmit(form:any){
    this._paymentService.update(this.payment.id, this.payment).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Abono Editado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/expense']);
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

  getPayment(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._paymentService.getId(id).subscribe(
        response => {
          if(response.payment) {
            this.payment = response.payment;
            this.payment.fecha = moment(this.payment.fecha).format('YYYY-MM-DD');
          } else {
            this._router.navigate(['/expense']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/expense']);
        }
      );
    })
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
      }
    )
  }

  getUsers(){
    this._userService.getAll().subscribe(
      response => {
        if(response.users){
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  getCeco(){
    this._cecoService.getId(this.ceco).subscribe(
    response => {
        if(response.ceco) {
            console.log(response.ceco);
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

  getProjects(){
    this._projectService.getAll(this.ceco).subscribe(
      response => {
        if(response.projects) {
          this.projects = response.projects;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    );
  }

}
