import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { SubCategoryService } from '@services/subcategory.service';
import { global } from '@services/global';

@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.scss'],
  providers: [UserService, SubCategoryService]
})
export class SubcategoryListComponent implements OnInit, OnDestroy {

  public title: string;
  public subcategories: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;

  public dtOptions: any;
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _subcategoryService: SubCategoryService
  ) {
    this.title = 'SubCategorias';
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
      columnDefs: [
        {
          targets: 'nosort',
          orderable: false
        }
      ],
      dom: 'lBfrtip',
        buttons: [ 
          {
            extend: 'excel',
            text: '<i class="far fa-file-excel"></i>',
            className: "btn btn-sm btn-success ml-3 excelBtn",
            titleAttr: 'Exportar a Excel',
            exportOptions: {
              columns: ':not(.notexport)'
            }
          },
          {
            extend: 'pdf',
            text: '<i class="far fa-file-pdf"></i>',
            className: "btn btn-sm btn-danger pdfBtn",
            titleAttr: 'Exportar a PDF',
            exportOptions: {
              columns: ':not(.notexport)'
            }
          },
          {
            extend: 'print',
            text: '<i class="fas fa-print"></i>',
            className: "btn btn-sm btn-primary printBtn",
            titleAttr: 'Imprimir',
            exportOptions: {
              columns: ':not(.notexport)'
            }
          }
         ],
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getSubcategories();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getSubcategories() {
    this._subcategoryService.getAll().subscribe(
      response => {
        if(response.status == 'success') {
          this.subcategories = response.subcategories;
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

  deleteSubcategory(id:number){
    this._subcategoryService.deleteSubcategory(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "SubCategoria eliminada con Exito";
        this.getSubcategories();
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/subcategory']);
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
