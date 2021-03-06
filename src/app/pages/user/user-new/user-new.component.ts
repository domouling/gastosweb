import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';

import { User } from '@/models/user';
import { UserImage } from '@/models/userimage';
import { global } from '@services/global';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss'],
  providers: [UserService, CecoService]
})
export class UserNewComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public user: any;
  public userImage: any;
  public status: string;
  public url: string;
  public msg: string;
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
    this.user = new User(null,'','','','','ROLE_USER',1,'','',null,'','','');
    this.userImage = new UserImage('','');
    this.title = 'Usuarios';
    this.subtitle = 'Nuevo Usuario';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.fileName = '';
    this.filex = null;
    this.srcFile = null;
    this.cecos = null;

    this.is_edit = false;

  }

  ngOnInit(): void {
    this.getCecos();
    this.getIdentity();
  }

  getIdentity(){
    this._userService.getIdentity().subscribe(
      response => {
        if(response.status === 'success'){
          this.user.admin_id = response.data._id;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  onSubmit(form:any){
    let imagen = this.user.imagen;
    let correo = this.user.email;

    this._userService.add(this.user).subscribe(
      response => {
        console.log(response.user.imagen);
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Usuario creado con exito!';
          console.log(this.filex);
          if(response.user.imagen){
            if(this.filex){
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

  deleteAvatar(){
    this.fileName = null;
    this.filex = null;
    this.srcFile = null;
    this.user.imagen = null;
  }


}
