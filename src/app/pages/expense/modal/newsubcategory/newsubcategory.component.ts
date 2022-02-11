import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { SubCategoryService } from '@services/subcategory.service';

import { SubCategory } from '@/models/subcategory';

@Component({
  selector: 'app-newsubcategory',
  templateUrl: './newsubcategory.component.html',
  styleUrls: ['./newsubcategory.component.scss'],
  providers: [SubCategoryService]
})
export class NewsubcategoryComponent implements OnInit {

  public title?: string;
  public list?: any;
  public id?: number;

  public subcategory: any;

  constructor(
    public bsModalRef: BsModalRef,
    private _subcategoryService: SubCategoryService
  ) {
    this.subcategory = new SubCategory(null,null,this.id,1,1,1,null,1,'','');

  }

  ngOnInit(): void {
  }

  public onSubmit(form:any) {
    
    this.subcategory.categoria_id = this.id;

    let newId;
    
    this._subcategoryService.add(this.subcategory).subscribe(
      response => {
        if(response.status == 'success'){
          newId = response.subcategory.id;

          this._subcategoryService.getCatId(this.id).subscribe(
            response => {
              if(response.subcategory){
                this.bsModalRef.content.onClose.next({
                  data: response.subcategory,
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
