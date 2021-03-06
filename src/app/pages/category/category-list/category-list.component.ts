import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { CategoryService } from '@services/category.service';
import { global } from '@services/global';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  providers: [UserService, CategoryService]
})
export class CategoryListComponent implements OnInit, OnDestroy {

  public title: string;
  public categories: any;
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
    private _categoryService: CategoryService
  ) {
    this.title = 'Categorias';
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

    this.getCategories();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  getCategories() {
    this._categoryService.getAll().subscribe(
      response => {

        if(response.status == 'success') {
          this.categories = response.categories;
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

  deleteCategory(id:number){
    this._categoryService.deleteCategory(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Categoria eliminada con Exito";
        this.getCategories();
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/admin/category']);
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
