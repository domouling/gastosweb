import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { SubCategoryService2 } from '@services/subcategory2.service';
import { global } from '@services/global';

@Component({
  selector: 'app-subcategory2-list',
  templateUrl: './subcategory2-list.component.html',
  styleUrls: ['./subcategory2-list.component.scss'],
  providers: [UserService, SubCategoryService2]
})
export class Subcategory2ListComponent implements OnInit, OnDestroy {

  public title: string;
  public subcategories2: any;
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
    private _subcategoryService2: SubCategoryService2
  ) {
    this.title = 'SubCategorias2';
    this.url = global.url;
    this.status = '';
    this.msg = '';
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
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getSubcategories2();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getSubcategories2() {
    this._subcategoryService2.getAll().subscribe(
      response => {

        if(response.status == 'success') {
          this.subcategories2 = response.data;
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

  deleteSubcategory2(id:number){
    this._subcategoryService2.deleteSubcategory2(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "SubCategoria2 eliminada con Exito";
        this.getSubcategories2();
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/subcategory2']);
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

}
