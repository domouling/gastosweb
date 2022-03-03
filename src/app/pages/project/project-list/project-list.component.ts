import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { ProjectService } from '@services/project.service';
import { ExpenseService } from '@services/expense.service';
import { PaymentService } from '@services/payment.service';
import { global } from '@services/global';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [UserService, ProjectService, CecoService, ExpenseService, PaymentService]
})
export class ProjectListComponent implements OnInit, OnDestroy {

  public title: string;
  public projects: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;
  public ceco: any;
  //public cecoName: string = '';

  public totexp: any;
  public totpay: any;

  public dtOptions: any;
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _projectService: ProjectService,
    private _cecoService: CecoService,
    private _expenseService: ExpenseService,
    private _paymentService: PaymentService
  ) {
    this.title = 'Proyectos';
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
      scrollX: true,
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
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getProjects(this.ceco);
    this.refreshData();
    //this.getCeco();
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

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  getProjects(ceco: number) {
    if(ceco) {
      this._projectService.getAllExpense(ceco).subscribe(
        response => {
          if(response.status == 'success') {
            this.projects = response.projects;
            this.dtTrigger.next(null);
          }
        },
        error => {
          this.toastr.error(error.error.msg);
          this.status = 'error';
          if(error.status == 419){
            this._userService.logout();
            setTimeout(() => this._router.navigate(['/login']), 500);
          }
        }
      )

    }
  }

  deleteProject(id:number){
    this._projectService.deleteProject(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Proyecto eliminada con Exito";
        this.getProjects(this.ceco);
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/projects']);
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
