import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { ProviderService } from '@services/provider.service';
import { User } from '@/models/user';
import { Provider } from '@/models/provider';

import { global } from '@services/global';

@Component({
  selector: 'app-provider-new',
  templateUrl: './provider-new.component.html',
  styleUrls: ['./provider-new.component.scss'],
  providers: [UserService, ProviderService]
})
export class ProviderNewComponent implements OnInit {

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
    this.is_edit = false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._providerService.add(this.provider).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Proveedor creado con exito!';
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

}
