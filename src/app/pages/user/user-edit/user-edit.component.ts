import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { User } from '@/models/user';
import { UserImage } from '@/models/userimage';
import { global } from '@services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-new/user-new.component.html',
  styleUrls: ['../user-new/user-new.component.scss'],
  providers: [UserService, CecoService]
})

export class UserEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public user: any;
  public userImage: any;
  public status: string;
  public url: string;
  public msg: string;
  public first: any;
  public fileName: any;
  public filex: any;
  public srcFile: any;
  public is_edit: boolean;

  public cecos: any;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _cecoService: CecoService
  ) {
    this.user = new User(null,'','','','','ROLE_USER',1,'','',1,'','','');
    this.userImage = new UserImage('','');
    this.title = 'Usuarios';
    this.subtitle = 'Editar Usuario';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.first = null;
    this.fileName = '';
    this.filex = null;
    this.srcFile = null;
    this.cecos = null;

    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getUser();
    this.getCecos();
  }

  onSubmit(form:any){
    console.log(this.user);
    let imagen = this.fileName;
    let correo = this.user.email;
    let id = this.user.id;

    this._userService.update(id,this.user).subscribe(
      response => {
        if(response.status == 'success'){
          console.log(response);
          this.status = 'success';
          this.msg = 'Usuario actualizado con exito!';
          if(imagen){
            if(this.filex){
              if(this.filex != this.first && this.first) {
                this._userService.deleteAvatar(this.first).subscribe(
                  response => {},
                  error => {
                    console.log(error);
                  }
                )
              }
              this._userService.addAvatar(this.filex).subscribe(
                response => {
                  imagen = response.data;
                  this.userImage.imagen = imagen;
                  this.userImage.email = correo;
                  this._userService.updateImage(this.userImage).subscribe(
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
              this._userService.deleteAvatar(this.first).subscribe(
                response => {},
                error => {
                  console.log(error);
                }
              )
            }
          }
          this.toastr.success(this.msg);
          this._router.navigate(['/admin/users']);
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

  getCecos() {
    this._cecoService.getAllAct().subscribe(
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

  getUser(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._userService.getUser(id).subscribe(
        response => {
          if(response.user) {
            this.user = response.user;
            if(this.user.imagen){
              this.first = this.user.imagen;
            }
            this.fileName = this.user.imagen;
          } else {
            this._router.navigate(['/admin/users']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/admin/users']);
        }
      );
    })
  }

  deleteAvatar(){
    this.fileName = null;
    this.filex = null;
    this.srcFile = null;
    this.user.imagen = null;
  }



}

