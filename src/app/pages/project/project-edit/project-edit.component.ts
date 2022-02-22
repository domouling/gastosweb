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

import { Project } from '@/models/project';

import { global } from '@services/global';


@Component({
  selector: 'app-project-edit',
  templateUrl: '../project-new/project-new.component.html',
  styleUrls: ['../project-new/project-new.component.scss'],
  providers: [UserService, ProviderService, ProjectService, CecoService]
})
export class ProjectEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public project: any;
  public providers: any;
  public cecos: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  public expense: any;

  public ceco: number;
  //public cecoName: string = '';

  public bsModalRef: BsModalRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _providerService: ProviderService,
    private _projectService: ProjectService,
    private _cecoService: CecoService,
    private _modalService: BsModalService
  ) {

    this.ceco =  parseInt(localStorage.getItem('ceco'));

    this.project = new Project(null,'','','',0,0,0,this.ceco,1,'','');
    this.title = 'Proyectos';
    this.subtitle = 'Editar Proyecto';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getProviders();
    this.getCecos();
    //this.getCeco();
    this.getProject();
    this.getExpenseId();
  }

  onSubmit(form:any){
    this._projectService.update(this.project.id, this.project).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Proyecto Editado con exito!';
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

  getProject(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._projectService.getId(id).subscribe(
        response => {
          if(response.project) {
            this.project = response.project;
            this.project.fechainicio = moment(this.project.fechainicio).format('YYYY-MM-DD');
            this.project.fechafin = moment(this.project.fechafin).format('YYYY-MM-DD');
          } else {
            this._router.navigate(['/projects']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/projects']);
        }
      );
    })
  }

  getExpenseId(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._projectService.getExpenseId(id).subscribe(
        response => {
          if(response.expense) {
            this.expense = '$' + new Intl.NumberFormat('es-MX').format(response.expense[0].pagado);
          }
        },
        error => {
          console.log(error);
        }
      );
    })
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
