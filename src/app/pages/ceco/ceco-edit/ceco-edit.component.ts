import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { Ceco } from '@/models/ceco';
import { CecoImage } from '@/models/cecoimage';

import { global } from '@services/global';

@Component({
  selector: 'app-ceco-edit',
  templateUrl: '../ceco-new/ceco-new.component.html',
  styleUrls: ['../ceco-new/ceco-new.component.scss'],
  providers: [UserService, CecoService]
})
export class CecoEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public ceco: any;
  public cecoImage: any;
  public status: string;
  public url: string;
  public msg: string;
  public first: any;
  public fileName: any;
  public filex: any;
  public srcFile: any;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _cecoService: CecoService
  ) {
    this.ceco = new Ceco(null,'',1,null,null,'','');
    this.cecoImage = new CecoImage(null,'');
    this.title = 'Centro Costo';
    this.subtitle = 'Editar CeCo';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.first = null;
    this.fileName = '';
    this.filex = null;
    this.srcFile = null;
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getCeco();
  }

  onSubmit(form:any){
    let imagen = this.fileName;
    let id = this.ceco.id


    this._cecoService.update(id, this.ceco).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Ceco actualizado con exito!';
          if(imagen){
            if(this.filex){
              if(this.filex != this.first && this.first) {
                this._cecoService.deleteAvatar(this.first).subscribe(
                  response => {},
                  error => {
                    console.log(error);
                  }
                )
              }
              this._cecoService.addAvatar(this.filex).subscribe(
                response => {
                  imagen = response.data;
                  this.cecoImage.imagen = imagen;
                  this.cecoImage.id = id;
                  this._cecoService.updateImage(this.cecoImage).subscribe(
                    response => {
                      this.toastr.success(response.msg);
                    },
                    error => {
                      console.log(error);
                    }
                  );
                },
                error => {
                  console.log(error);
                }
              ); 
            }
          } else {
            if(this.first){
              this._cecoService.deleteAvatar(this.first).subscribe(
                response => {},
                error => {
                  console.log(error);
                }
              )
            }
          }
          this.toastr.success(this.msg);
          this._router.navigate(['/ceco']);
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

  onFileSelected(data: any){
    this.fileName = data.target.files[0].name;
    this.filex = data.target.files[0];

    let file = (data.target as HTMLInputElement).files[0];
    if(data.target.files && data.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(data.target.files[0]);

      reader.onload = (data) => {
        this.srcFile = data.target.result;
      }
    }
  }

  deleteAvatar(){
    this.fileName = null;
    this.filex = null;
    this.srcFile = null;
    this.ceco.imagen = null;
  }

  getCeco(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._cecoService.getId(id).subscribe(
        response => {
          if(response.ceco) {
            this.ceco = response.ceco;
            if(this.ceco.imagen){
              this.first = this.ceco.imagen;
            }
            this.fileName = this.ceco.imagen;
          } else {
            this._router.navigate(['/ceco']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/ceco']);  
        }
      );
    })
  }

}
