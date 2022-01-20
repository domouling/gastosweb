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
  selector: 'app-subcategory-new',
  templateUrl: './subcategory-new.component.html',
  styleUrls: ['./subcategory-new.component.scss'],
  providers: [UserService, SubCategoryService, CategoryService]
})
export class SubcategoryNewComponent implements OnInit {

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
    this.subcategory = new SubCategory(1,'',1,0,0,0,'',1,'','');
    this.title = 'SubCategoria';
    this.subtitle = 'SubCategoria Nueva';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
   }

  ngOnInit(): void {
    this.getCategories();
  }

  onSubmit(form:any){
    this._subcategoryService.add(this.subcategory).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'SubCategoria creada con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/subcategory']);
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

  getCategories(){
    this._categoryService.getAll().subscribe(
      response => {
        if(response.data){
          this.categories = response.data;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}
