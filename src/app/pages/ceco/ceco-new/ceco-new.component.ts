import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { Ceco } from '@/models/ceco';
import { CecoImage } from '@/models/cecoimage';

import { global } from '@services/global';

@Component({
  selector: 'app-ceco-new',
  templateUrl: './ceco-new.component.html',
  styleUrls: ['./ceco-new.component.scss'],
  providers: [UserService, CecoService]
})
export class CecoNewComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public ceco: any;
  public cecoImage: any;
  public status: string;
  public url: string;
  public msg: string;
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
    this.title = 'Centro de Costo';
    this.subtitle = 'Nuevo CeCo';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.fileName = '';
    this.filex = null;
    this.srcFile = null;
    this.is_edit = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    let imagen = this.ceco.imagen;

    this._cecoService.add(this.ceco).subscribe(
      response => {
        //console.log(response);
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Centro Costo creado con exito!';
          let id = response.ceco.id;

          if(imagen){
            if(this.filex){
              this._cecoService.addAvatar(this.filex).subscribe(
                response => {
                  console.log(response);
                  imagen = response.data;
                  this.cecoImage.imagen = imagen;
                  this.cecoImage.id = id;
                  console.log(this.cecoImage);
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



}
