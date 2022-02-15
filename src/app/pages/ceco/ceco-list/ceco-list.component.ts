import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { CecoService } from '@services/ceco.service';
import { global } from '@services/global';

@Component({
  selector: 'app-ceco-list',
  templateUrl: './ceco-list.component.html',
  styleUrls: ['./ceco-list.component.scss'],
  providers: [UserService, CecoService]
})
export class CecoListComponent implements OnInit, OnDestroy {

  public title: string;
  public cecos: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _cecoService: CecoService
  ) {
    this.title = 'Centro Costo';
    this.url = global.url;
    this.status = '';
    this.msg = '';
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
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getCecos();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  getCecos() {
    this._cecoService.getAll().subscribe(
      response => {
        if(response.status == 'success') {
          this.cecos = response.cecos;
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

  deleteCeco(id:number){
    this._cecoService.deleteCeco(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Usuario eliminado con Exito";
        this.getCecos();
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/ceco']);
      },
      error => {
        this.msg = error.error.msg;
        this.status = 'error';
        if(error.status == 419){
          localStorage.removeItem('token');
          //localStorage.removeItem('identity');
          setTimeout(() => this._router.navigate(['/login']), 1500);
        }
      }
    )
  }

}
