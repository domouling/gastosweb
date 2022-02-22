import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { CategoryService } from '@services/category.service';
import { User } from '@/models/user';
import { Category } from '@/models/category';

import { global } from '@services/global';

@Component({
  selector: 'app-category-edit',
  templateUrl: '../category-new/category-new.component.html',
  styleUrls: ['../category-new/category-new.component.scss'],
  providers: [UserService, CategoryService]
})
export class CategoryEditComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public category: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _categoryService: CategoryService
  ) {
    this.category = new Category(null,1,'','',1,'','');
    this.title = 'Categoria';
    this.subtitle = 'Categoria Nueva';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = true;
  }

  ngOnInit(): void {
    this.getCategory();
  }

  onSubmit(form:any){
    this._categoryService.update(this.category.id, this.category).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Categoria Editada con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/admin/category']);
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

  getCategory(){
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._categoryService.getId(id).subscribe(
        response => {
          if(response.category) {
            this.category = response.category;
          } else {
            this._router.navigate(['/admin/category']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/admin/category']);
        }
      );
    })
  }

}
