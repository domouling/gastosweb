import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment, { Moment } from 'moment';
import { Subject } from 'rxjs';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { NewproviderComponent } from '@pages/expense/modal/newprovider/newprovider.component';
import { UserService } from '@services/user.service';
import { ProviderService } from '@services/provider.service';
import { ProjectService } from '@services/project.service';
import { CecoService } from '@services/ceco.service';
import { ExpenseService } from '@services/expense.service';
import { PaymentService } from '@services/payment.service';

import { Project } from '@/models/project';

import { global } from '@services/global';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.scss'],
  providers: [UserService, ProviderService, ProjectService, CecoService, ExpenseService, PaymentService]
})
export class ProjectNewComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public today: any;
  public tomorrow: any;
  public project: any;
  public providers: any;
  public cecos: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  public expense: any;

  public ceco: any;
  //public cecoName: string = '';

  public totexp: any;
  public totpay: any;

  public bsModalRef: BsModalRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _providerService: ProviderService,
    private _projectService: ProjectService,
    private _cecoService: CecoService,
    private _expenseService: ExpenseService,
    private _paymentService: PaymentService,
    private _modalService: BsModalService

  ) {

    this.today = moment().format('YYYY-MM-DD');
    this.tomorrow = moment().add(3,'months').format('YYYY-MM-DD');

    this.ceco =  localStorage.getItem('ceco');
    this.project = new Project(null, null, this.today, this.tomorrow, 0, 0, '0', '0', this.ceco, 1, '', '');

    this.title = 'Proyectos';
    this.subtitle = 'Proyecto Nuevo';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
  }

  ngOnInit(): void {
    this.getProviders();
    this.getCecos();
    this.getIdentity();
    //this.getCeco();
    this.refreshData();
  }

  refreshData(){

    let body = {
      ceco: this.ceco || 1,
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
  }

  onSubmit(form:any){
    this._projectService.add(this.project).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Proyecto creado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/projects']);
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

  getIdentity(){
    this._userService.getIdentity().subscribe(
      response => {
        if(response.status === 'success'){
          this.project.user_id = response.data._id;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  getProviders(){
    this._providerService.getAllAct().subscribe(
      response => {
        if(response.providers){
          this.providers = response.providers;
        }
      },
      error => {
        console.log(error);
      }
    )
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
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  /* getCeco(){
    this._cecoService.getId(this.ceco).subscribe(
    response => {
        if(response.ceco) {
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

  newProveedor(e: Event){
    e.preventDefault();
    this.bsModalRef = this._modalService.show(NewproviderComponent);

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        this.providers = result.data;
        this.project.proveedor_id = result.newId;
      }
    })

  }

}

