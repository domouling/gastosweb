import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ProviderService } from '@services/provider.service';

import { Provider } from '@/models/provider';

@Component({
  selector: 'app-newprovider',
  templateUrl: './newprovider.component.html',
  styleUrls: ['./newprovider.component.scss'],
  providers: [ProviderService]
})
export class NewproviderComponent implements OnInit {

  public list?: any = [];
  public provider: any;

  constructor(
    public bsModalRef: BsModalRef,
    private _providerService: ProviderService
  ) {
    this.provider = new Provider(null,null,1,'','');
  }

  ngOnInit(): void {
  }

  public onSubmit(form:any) {

    this.provider.user_id = this.list[0];

    let newId;
    this._providerService.add(this.provider).subscribe(
      response => {
        if(response.status == 'success'){
          newId = response.provider.id;
          this._providerService.getAllAct().subscribe(
            response => {
              if(response.providers){
                this.bsModalRef.content.onClose.next({
                  data: response.providers,
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
