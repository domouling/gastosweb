import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { SubCategoryService } from '@services/subcategory.service';
import { CategoryService } from '@services/category.service';
import { User } from '@/models/user';
import { SubCategory } from '@/models/subcategory';


import { global } from '@services/global';

@Component({
  selector: 'app-subcategory-edit',
  templateUrl: '../subcategory-new/subcategory-new.component.html',
  styleUrls: ['../subcategory-new/subcategory-new.component.scss'],
  providers: [UserService, SubCategoryService, CategoryService]
})
export class SubcategoryEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public subcategory: any;
  public categories: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _subcategoryService: SubCategoryService
  ) {
    this.subcategory = new SubCategory(null,'',null,0,0,0,null,1,'','');
    this.title = 'Concepto';
    this.subtitle = 'Editar Concepto';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getSubCategory();
    this.getIdentity();
  }

  getIdentity(){
    this._userService.getIdentity().subscribe(
      response => {
        if(response.status === 'success'){
          this.subcategory.user_id = response.data._id;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  onSubmit(form:any){
    this._subcategoryService.update(this.subcategory.id, this.subcategory).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Concepto Editado con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/admin/subcategory']);
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

  getSubCategory(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._subcategoryService.getId(id).subscribe(
        response => {
          if(response.subcategory) {
            this.subcategory = response.subcategory;
          } else {
            this._router.navigate(['/admin/subcategory']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/admin/subcategory']);
        }
      );
    })
  }

  getCategories(){
    this._categoryService.getAll().subscribe(
      response => {
        if(response.categories){
          this.categories = response.categories;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
