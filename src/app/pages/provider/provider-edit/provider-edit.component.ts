import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { ProviderService } from '@services/provider.service';
import { User } from '@/models/user';
import { Provider } from '@/models/provider';

import { global } from '@services/global';

@Component({
  selector: 'app-provider-edit',
  templateUrl: '../provider-new/provider-new.component.html',
  styleUrls: ['../provider-new/provider-new.component.scss'],
  providers: [UserService, ProviderService]
})
export class ProviderEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public provider: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _providerService: ProviderService
  ) {
    this.provider = new Provider(null,'',1,'','');
    this.title = 'Proveedores';
    this.subtitle = 'Proveedor Nuevo';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getTpocuenta();
    this.getIdentity();
  }

  getIdentity(){
    this._userService.getIdentity().subscribe(
      response => {
        if(response.status === 'success'){
          this.provider.user_id = response.data._id;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  onSubmit(form:any){
    this._providerService.update(this.provider.id, this.provider).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Proveedor Editado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/admin/provider']);
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

  getTpocuenta(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._providerService.getId(id).subscribe(
        response => {
          if(response.provider) {
            this.provider = response.provider;
          } else {
            this._router.navigate(['/admin/provider']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/admin/provider']);
        }
      );
    })
  }

}
