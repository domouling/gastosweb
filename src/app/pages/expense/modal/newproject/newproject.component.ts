import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import moment, { Moment } from 'moment';

import { ProjectService } from '@services/project.service';
import { ProviderService } from '@services/provider.service';

import { Project } from '@/models/project';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrls: ['./newproject.component.scss'],
  providers: [ProviderService, ProjectService]
})
export class NewprojectComponent implements OnInit {

  public title?: string;
  public list?: any = [];
  public today: any;
  public tomorrow: any;

  public providers: any;
  
  public project: any;

  constructor(
    public bsModalRef: BsModalRef,
    private _providerService: ProviderService,
    private _projectService: ProjectService
  ) {

    this.today = moment().format('YYYY-MM-DD');
    this.tomorrow = moment().add(3,'months').format('YYYY-MM-DD');

    this.project = new Project(null,null,this.today,this.tomorrow,0,0,1,parseInt(this.list[0]),1,'','');

  }

  ngOnInit(): void {
    this.getProviders();
  }

  async getProviders(){
    (await this._providerService.getAllAct()).subscribe(
      response => {
        if(response.status == 'success'){
          this.providers = response.providers;
        }
      },
      error => {
        console.log(error);
      }
    );
      
  }

  public onSubmit(form:any) {

    this.project.ceco_id = parseInt(this.list[0]);

    let newId;
    let prov;

    //console.log(this.project);

    this._projectService.add(this.project).subscribe(
      response => {
        if(response.status == 'success'){
          newId = response.project.id;
          prov = response.project.proveedor_id;
          this._projectService.getAll(parseInt(this.list[0])).subscribe(
            response => {
              if(response.projects){
                this.bsModalRef.content.onClose.next({
                  data: response.projects,
                  newId: newId,
                  prov: prov
                });
                this.bsModalRef.hide();
              }
            },
            error => {
              console.log(error);
            }
          )
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  public onCancel(): void {
    this.bsModalRef.content.onClose.next(null);
    this.bsModalRef.hide();
  }



}
