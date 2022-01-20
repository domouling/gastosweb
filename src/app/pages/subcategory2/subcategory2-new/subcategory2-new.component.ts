import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { SubCategoryService } from '@services/subcategory.service';
import { SubCategoryService2 } from '@services/subcategory2.service';

import { User } from '@/models/user';
import { SubCategory2 } from '@/models/subcategory2';

import { global } from '@services/global';

@Component({
  selector: 'app-subcategory2-new',
  templateUrl: './subcategory2-new.component.html',
  styleUrls: ['./subcategory2-new.component.scss'],
  providers: [UserService, SubCategoryService, SubCategoryService2]
})
export class Subcategory2NewComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public subcategory2: any;
  public subcategories: any;
  public status: string;
  public url: string;
  public msg: string;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _subcategoryService: SubCategoryService,
    private _subcategoryService2: SubCategoryService2
  ) {
    this.subcategory2 = new SubCategory2(1,'',0,0,0,1,'',1,'','');
    this.title = 'SubCategoria2';
    this.subtitle = 'SubCategoria2 Nueva';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.is_edit = false;
  }

  ngOnInit(): void {
    this.getSubCategories();
  }

  onSubmit(form:any){
    this._subcategoryService2.add(this.subcategory2).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'SubCategoria2 creada con exito!';
          this.toastr.success(this.msg);
          this._router.navigate(['/subcategory2']);
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

  getSubCategories(){
    this._subcategoryService.getAll().subscribe(
      response => {
        if(response.data){
          this.subcategories = response.data;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

}