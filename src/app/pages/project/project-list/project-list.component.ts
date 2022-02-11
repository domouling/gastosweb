import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { ProjectService } from '@services/project.service';
import { global } from '@services/global';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  providers: [UserService, ProjectService, CecoService]
})
export class ProjectListComponent implements OnInit, OnDestroy {

  public title: string;
  public projects: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;
  public ceco: number;
  public cecoName: string = '';

  public dtOptions: any;
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _projectService: ProjectService,
    private _cecoService: CecoService
  ) {
    this.title = 'Proyectos';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.ceco =  parseInt(localStorage.getItem('ceco'));
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
    this.getCeco();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getProjects(ceco: number) {
    /* this._projectService.getAll(ceco).subscribe(
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
          setTimeout(() => this._router.navigate(['/login']), 1500);
        }
      }
    ) */
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
          setTimeout(() => this._router.navigate(['/login']), 1500);
        }
      }
    )
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

}
