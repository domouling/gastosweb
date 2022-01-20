import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

import { UserService } from '@services/user.service';
import { EstimateService } from '@services/estimate.service';
import { global } from '@services/global';

@Component({
  selector: 'app-budget-list',
  templateUrl: './budget-list.component.html',
  styleUrls: ['./budget-list.component.scss'],
  providers: [UserService, EstimateService]
})
export class BudgetListComponent implements OnInit, OnDestroy {

  public title: string;
  public estimates: any;
  public status: string;
  public url: any;
  public msg: string;
  public prueba: any;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _estimateService: EstimateService
  ) {
    this.title = 'Presupuestos';
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
      language: {url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'},
    }

    this.getEstimates();  
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();  
  }

  getEstimates() {
    this._estimateService.getAll().subscribe(
      response => {

        if(response.status == 'success') {
          this.estimates = response.data;
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

  deleteEstimate(id:number){
    this._estimateService.deleteEstimate(id).subscribe(
      response => {
        this.status = 'success';
        this.msg = "Presupuesto eliminado con Exito";
        this.getEstimates();
        //window.location.reload();
        this._router.routeReuseStrategy.shouldReuseRoute = () => false;
        this._router.onSameUrlNavigation = 'reload';
        this._router.navigate(['/estimate']);
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
