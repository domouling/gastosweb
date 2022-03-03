import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { CategoryService } from '@services/category.service';

import { Category } from '@/models/category';

@Component({
  selector: 'app-newcategory',
  templateUrl: './newcategory.component.html',
  styleUrls: ['./newcategory.component.scss'],
  providers: [CategoryService]
})
export class NewcategoryComponent implements OnInit {

  public category: any;
  public list?: any = [];

  constructor(
    public bsModalRef: BsModalRef,
    private _categoryService: CategoryService
  ) {
    this.category = new Category(null,1,null,null,1,'','');
  }

  ngOnInit(): void {
  }

  public onSubmit(form:any) {
    this.category.user_id = this.list[0];
    let newId;
    this._categoryService.add(this.category).subscribe(
      response => {
        if(response.status == 'success'){
          newId = response.category.id;
          this._categoryService.getAll().subscribe(
            response => {
              if(response.categories){
                this.bsModalRef.content.onClose.next({
                  data: response.categories,
                  newId: newId
                });
                this.bsModalRef.hide();
              }
            },
            error => {
              console.log(error);
            }
          )
        }
      },
    );
  }

  public onCancel(): void {
    this.bsModalRef.content.onClose.next(null);
    this.bsModalRef.hide();
  }

}
