import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '@services/user.service';
import { ExpenseService } from '@services/expense.service';
import { EstimateService } from '@services/estimate.service';
import { CategoryService } from '@services/category.service';
import { ProviderService } from '@services/provider.service';
import { TipoGastoService } from '@services/tipogasto.service';
import { TpoCuentaService } from '@services/tpocuenta.service';
import { CecoService } from '@services/ceco.service';
import { TrxCurrencyService } from '@services/trxcurrency.service';
import { SubCategoryService2 } from '@services/subcategory2.service';
import { SubCategoryService } from '@services/subcategory.service';


import { User } from '@/models/user';
import { Expense } from '@/models/expense';
import { UserImage } from '@/models/userimage';
import { ExpenseImage } from '@/models/expenseimage';

import { global } from '@services/global';

@Component({
  selector: 'app-expense-new',
  templateUrl: './expense-new.component.html',
  styleUrls: ['./expense-new.component.scss'],
  providers: [
    UserService,
    ExpenseService,
    EstimateService,
    CategoryService,
    ProviderService,
    TipoGastoService,
    TpoCuentaService,
    CecoService,
    TrxCurrencyService,
    SubCategoryService,
    SubCategoryService2
  ]
})
export class ExpenseNewComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public users: any;
  public expense: any;
  public estimates: any;
  public categories: any;
  public providers: any;
  public tipogastos: any;
  public tipocuentas: any;
  public cecos: any;
  public monedas: any;
  public subcategories: any = [];
  public subcategories2: any = [];
  public userImage: any;
  public expenseImage: any;
  public status: string;
  public tipocta: any;
  public montopresupuesto: any;
  public montonvogasto: any;
  public total: any;
  public url: string;
  public msg: string;
  public error: string;
  public fileName: any;
  public filex: any;
  public srcFile: any;
  public is_edit: boolean;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _expenseService: ExpenseService,
    private _estimateService: EstimateService,
    private _categoryService: CategoryService,
    private _subcategoryService: SubCategoryService,
    private _subcategoryService2: SubCategoryService2,
    private _cecoService: CecoService,
    private _providerService: ProviderService,
    private _tipogastoService: TipoGastoService,
    private _tipocuentaService: TpoCuentaService,
    private _trxcurrencyService: TrxCurrencyService
  ) {

    this.expense = new Expense(1,1,0,'','','','','','',0,'','',0,0,0,'',1,1,1,1,1,1,1,'',1,'','');
    this.expenseImage = new ExpenseImage(1,'');
    this.title = 'Gastos';
    this.subtitle = 'Nuevo Gasto';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.fileName = '';
    this.filex = null;
    this.srcFile = null;
    this.is_edit = false;

  }

  ngOnInit(): void {
    this.getCategories();
    /* this.getSubCats();
    this.getSubCats2(); */
    this.getEstTotal();
    this.getProviders();
    this.getUsers();
    this.getTipogastos();
    this.getTipocuentas()
    this.getCecos();
    this.getMonedas();
  }

  async onChgSubc(data: any){
    let subc :any = document.getElementById('subcategoria_id');
    let subc2 :any = document.getElementById('subcategoria2_id');
    subc.disabled = false;
    subc2.disabled = 'disabled';
    await this.getSubCatId(data);
    subc.selectedIndex = 0;
    subc2.selectedIndex = 0;
    this.subcategories2 = [];
  }

  async onChgSubc2(data: any){
    let subc2 :any = document.getElementById('subcategoria2_id');
    subc2.disabled = false;
    await this.getSubCat2Id(data);
    subc2.selectedIndex = 0;
  }

  async onChgMonto(data: any) {
    this.montonvogasto = data;
  }

  async onChgMetod(data: any){
    console.log(data);
    console.log(this.estimates);
    switch (data) {
      case '1':
        this.tipocta = 'Cta. Corriente';
        this.montopresupuesto = this.estimates[0].totctacorriente;
        break;

      case '5':
        this.tipocta = 'Trj. Credito';
        this.montopresupuesto = this.estimates[0].tottrjcreditom;
        break;

      case '6':
        this.tipocta = 'Linea Credito';
        this.montopresupuesto = this.estimates[0].totlineacredito;
        break;
    
      default:
        this.tipocta = 'Global';
        this.montopresupuesto = this.estimates[0].total;
        break;
    }
    this.total = this.montopresupuesto - this.montonvogasto || 0;
    console.log(this.total);
  }

  getSubCatId(id: any){
    this._subcategoryService.getCatId(id).subscribe(
      response => {
        if(response.data){
          this.subcategories = response.data;
        }
      },
      error => {
        console.log(error);
        this.subcategories = [];
      }
    )
  }

  getSubCat2Id(id: any){
    this._subcategoryService2.getSubCatId(id).subscribe(
      response => {
        if(response.data){
          this.subcategories2 = response.data;
        }
      },
      error => {
        console.log(error);
        this.subcategories2 = [];
      }
    )
  }
  

  onSubmit(form:any){
    /* let imagen = this.user.imagen;
    let correo = this.user.email; */

    this._expenseService.add(this.expense).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Gasto creado con exito!';
          /* if(imagen){
            if(this.filex){
              this._userService.addAvatar(this.filex).subscribe(
                response => {
                  imagen = response.data;
                  this.userImage.imagen = imagen;
                  this.userImage.email = correo;
                  this._userService.updateImage(this.userImage).subscribe(
                    response => {
                      this.toastr.success(response.data.msg);
                    },
                    error => {
                      console.log(error);
                    }
                  );
                },
                error => {
                  console.log(error);
                }
              ); 
            }
          } */
          this.toastr.success(this.msg);
          this._router.navigate(['/expense']);
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

  getTipogastos(){
    this._tipogastoService.getAll().subscribe(
      response => {
        if(response.data){
          this.tipogastos = response.data;
        }
      },
      error => {
        console.log(error.status);
        this.error = error.status;
        if(error.status == 419){
          this._userService.logout();
        }
      }
    );
  }

  getTipocuentas(){
    this._tipocuentaService.getAll().subscribe(
      response => {
        if(response.data){
          this.tipocuentas = response.data;
        }
      },
      error => {
        console.log(error.status);
        this.error = error.status;
        if(error.status == 419){
          this._userService.logout();
        }
      }
    );
  }

  getCecos(){
    this._cecoService.getAll().subscribe(
      response => {
        if(response.data){
          this.cecos = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  getMonedas(){
    this._trxcurrencyService.getAll().subscribe(
      response => {
        if(response.data){
          this.monedas = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
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
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  getSubCats(){
    this._subcategoryService.getAll().subscribe(
      response => {
        if(response.data){
          this.subcategories = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  getSubCats2(){
    this._subcategoryService2.getAll().subscribe(
      response => {
        if(response.data){
          this.subcategories2 = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  getProviders(){
    this._providerService.getAll().subscribe(
      response => {
        if(response.data){
          this.providers = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  getUsers(){
    this._userService.getAll().subscribe(
      response => {
        if(response.data){
          this.users = response.data;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    )
  }

  getEstTotal(){
    this._estimateService.getTotals().subscribe(
      response => {
        if(response.data){
          this.estimates = response.data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }



  onFileSelected(data: any){
    this.fileName = data.target.files[0].name;
    this.filex = data.target.files[0];
    let file = (data.target as HTMLInputElement).files[0];
    if(data.target.files && data.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(data.target.files[0]);

      reader.onload = (data) => {
        this.srcFile = data.target.result;
      }
    }
  }

  deleteAvatar(){
    this.fileName = null;
    this.filex = null;
    this.srcFile = null;
    this.expense.imagen = null;
  }

}
