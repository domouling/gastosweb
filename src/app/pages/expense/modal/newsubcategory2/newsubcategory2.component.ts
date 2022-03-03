import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { SubCategoryService2 } from '@services/subcategory2.service';

import { SubCategory2 } from '@/models/subcategory2';

@Component({
  selector: 'app-newsubcategory2',
  templateUrl: './newsubcategory2.component.html',
  styleUrls: ['./newsubcategory2.component.scss'],
  providers: [SubCategoryService2]
})
export class Newsubcategory2Component implements OnInit {

  public title?: string;
  public list?: any;
  public id?: any;

  public subcategory2: any;

  constructor(
    public bsModalRef: BsModalRef,
    private _subcategoryService2: SubCategoryService2
  ) {
    this.subcategory2 = new SubCategory2(null,null,1,1,1,this.id,null,1,'','');
  }

  ngOnInit(): void {
  }

  public onSubmit(form:any) {

    this.subcategory2.subcategoria_id = this.id;
    this.subcategory2.user_id = this.list[1];

    let newId;

    this._subcategoryService2.add(this.subcategory2).subscribe(
      response => {
        if(response.status == 'success'){
          newId = response.subcategory2.id;

          this._subcategoryService2.getSubCatId(this.id).subscribe(
            response => {
              if(response.subcategory2){
                this.bsModalRef.content.onClose.next({
                  data: response.subcategory2,
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
