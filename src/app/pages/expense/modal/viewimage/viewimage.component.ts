import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';



@Component({
  selector: 'app-viewimage',
  templateUrl: './viewimage.component.html',
  styleUrls: ['./viewimage.component.scss']
})
export class ViewimageComponent implements OnInit {

  public title?: string;
  public list?: any;
  public id?: number;

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  public onCancel(): void {
    this.bsModalRef.content.onClose.next(null);
    this.bsModalRef.hide();
  }

}
