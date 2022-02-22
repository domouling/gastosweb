import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment, { Moment } from 'moment';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { NewcategoryComponent } from '../modal/newcategory/newcategory.component';
import { NewproviderComponent } from '../modal/newprovider/newprovider.component';
import { NewprojectComponent } from '../modal/newproject/newproject.component';
import { NewsubcategoryComponent } from '../modal/newsubcategory/newsubcategory.component';
import { Newsubcategory2Component } from '../modal/newsubcategory2/newsubcategory2.component';
import { ViewimageComponent } from '../modal/viewimage/viewimage.component';

import { UserService } from '@services/user.service';
import { ExpenseService } from '@services/expense.service';
import { PaymentService } from '@services/payment.service';
import { EstimateService } from '@services/estimate.service';
import { CategoryService } from '@services/category.service';
import { ProviderService } from '@services/provider.service';
import { TipoGastoService } from '@services/tipogasto.service';
import { TpoCuentaService } from '@services/tpocuenta.service';
import { CecoService } from '@services/ceco.service';
import { ProjectService } from '@services/project.service';
import { TrxCurrencyService } from '@services/trxcurrency.service';
import { SubCategoryService2 } from '@services/subcategory2.service';
import { SubCategoryService } from '@services/subcategory.service';


import { User } from '@/models/user';
import { Expense } from '@/models/expense';
import { UserImage } from '@/models/userimage';
import { ExpenseImage } from '@/models/expenseimage';

import { global } from '@services/global';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-expense-edit',
  templateUrl: '../expense-new/expense-new.component.html',
  styleUrls: ['../expense-new/expense-new.component.scss'],
  providers: [
    UserService,
    ExpenseService,
    PaymentService,
    EstimateService,
    CategoryService,
    ProviderService,
    TipoGastoService,
    TpoCuentaService,
    CecoService,
    ProjectService,
    TrxCurrencyService,
    SubCategoryService,
    SubCategoryService2
  ]
})
export class ExpenseEditComponent implements OnInit {

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
  public projects: any;
  public monedas: any;
  public subcategories: any;
  public subcategories2: any;
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
  public first: any;
  public fileName: any;
  public filex: any;
  public srcFile: any;
  public is_edit: boolean;

  public totexp: any;
  public totpay: any;

  public ceco:number;
  //public cecoName: string = '';

  public bsModalRef: BsModalRef;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private _expenseService: ExpenseService,
    private _paymentService: PaymentService,
    private _estimateService: EstimateService,
    private _categoryService: CategoryService,
    private _subcategoryService: SubCategoryService,
    private _subcategoryService2: SubCategoryService2,
    private _cecoService: CecoService,
    private _projectService: ProjectService,
    private _providerService: ProviderService,
    private _tipogastoService: TipoGastoService,
    private _tipocuentaService: TpoCuentaService,
    private _trxcurrencyService: TrxCurrencyService,
    private _modalService: BsModalService
  ) {

    this.ceco = parseInt(localStorage.getItem('ceco'));

    this.expense = new Expense(null,1,0,null,null,null,null,null,null,0,null,null,1,0,0,0,null,1,1,1,this.ceco,1,1,1,null,1,'','');
    this.expenseImage = new ExpenseImage(null,'');
    this.title = 'Movimientos';
    this.subtitle = 'Editar Cargo';
    this.url = global.url;
    this.status = '';
    this.msg = '';
    this.first = null;
    this.fileName = '';
    this.filex = null;
    this.srcFile = null;
    this.is_edit = true;
  }

  async ngOnInit(): Promise<void> {
    await this.getEstTotal();
    this.getExpense();
    this.getCategories();
    this.getSubCats();
    this.getSubCats2();
    this.getProviders();
    this.getUsers();
    this.getTipogastos();
    this.getTipocuentas()
    this.getCecos();
    this.getProjects();
    //this.getCeco();
    this.getMonedas();
    this.refreshData();

  }

  refreshData(){

    let body = {
      ceco: this.ceco || 1,
      desde: '2000-01-01',
      hasta: '2050-12-31'
    }

    this._expenseService.totalCeco(body).subscribe(
      response => {
      if(response.status == 'success'){
          this.totexp = response.expenses[0].montotot;
          this._paymentService.totalCeco(body).subscribe(
            response => {
              if(response.status == 'success'){
                this.totpay = response.payments[0].montotot;
                let total:any = this.totpay - this.totexp;

                let tot = total;
                total = total.toLocaleString('en') || '0';

                if(tot < 0 ) {

                  (<HTMLInputElement>document.getElementById('cecox2')).classList.remove('bg-success');
                  (<HTMLInputElement>document.getElementById('cecox2')).classList.add('bg-danger');

                } else {

                  (<HTMLInputElement>document.getElementById('cecox2')).classList.remove('bg-danger');
                  (<HTMLInputElement>document.getElementById('cecox2')).classList.add('bg-success');

                }
                (<HTMLInputElement>document.getElementById('cecox2')).innerHTML = 'SALDO ACTUAL: $CLP '+total;
              }
            },
            error => {
              console.log(error);
          })
        }
      },
      error => {
        console.log(error);
      });
  }

  async onChgSubc(data: any){
    let subc :any = document.getElementById('subcategoria_id');
    let subc2 :any = document.getElementById('subcategoria2_id');
    subc.disabled = false;
    subc2.disabled = 'disabled';
    await this.getSubCatId(data);
    subc.selectedIndex = 0;
    subc2.selectedIndex = 0;
    /* this.subcategories2 = []; */
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

  async onMetodChange(data:any){
    let proy: any = document.getElementById('colproj');
    if(data == 4){
      proy.classList.add('d-block');
    } else {
      proy.classList.replace('d-block','d-none');
    }

  }


  onChgMetod(data: any){
    console.log('el metodo es ',this.expense.metodo);
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

  onProjectChange(data:any){
    this._projectService.getId(data).subscribe(
      response => {
        console.log(response.provider);
        /* if(response.status = 'success'){
          this.expense.provvedor_id = response.
        } */
      },
      error => {
        console.log(error);
      }
    );
  }

  getSubCatId(id: any){
    this._subcategoryService.getCatId(id).subscribe(
      response => {
        if(response.subcategory){
          this.subcategories = response.subcategory;
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
        if(response.subcategory2){
          this.subcategories2 = response.subcategory2;
        }
      },
      error => {
        console.log(error);
        this.subcategories2 = [];
      }
    )
  }

  async getExpense(){
    await this._route.params.subscribe(params => {
      let id = params['id'];
      this._expenseService.getExpense(id).subscribe(
        response => {
          if(response.expense){
            this.expense = response.expense;
            this.expense.fechainicio = moment(this.expense.fechainicio).format('YYYY-MM-DD');
            if(this.expense.imagen){
              this.first = this.expense.imagen;
            }
            this.fileName = this.expense.imagen;
            this.montonvogasto = this.expense.monto;
            let caso = this.expense.metodo;

            this.getEstTotal();

            if(caso == '1') {
              this.tipocta = 'Cta. Corriente';
              //console.log(this.tipocta);
              this.montopresupuesto = this.estimates[0].totctacorriente;
            }
            if(caso == '1') {
              this.tipocta = 'Cta. Corriente';
              //console.log(this.tipocta);
              this.montopresupuesto = this.estimates[0].totctacorriente;
            }
            if(caso == '5') {
              this.tipocta = 'Trj. Credito';
              this.montopresupuesto = this.estimates[0].tottrjcreditom;
            }
            if(caso == '6') {
              this.tipocta = 'Linea Credito';
              this.montopresupuesto = this.estimates[0].totlineacredito;
            }
            if(caso > 6 || !caso || caso == '0') {
              this.tipocta = 'Global';
              this.montopresupuesto = this.estimates[0].totlineacredito;
            }
            //console.log('ohoh', this.montopresupuesto);
            this.total = this.montopresupuesto || 0 - this.montonvogasto || 0;

          } else {
            this._router.navigate(['/expense']);
          }
        },
        error => {
          console.log(error);
          this._router.navigate(['/expense'])
        }
      )
    })
  }


  onSubmit(form:any){
    let imagen = this.fileName;
    let id = this.expense.id;
    if(this.expense.tipogasto_id != 4){
      this.expense.proyecto_id = 0;
    }
    let proyecto = this.expense.proyecto_id;
    let monto = this.expense.monto;

    this._expenseService.update(this.expense.id, this.expense).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Cargo editado con exito!';
          if(imagen){
            if(this.filex){
              if(this.filex != this.first && this.first){
                this._expenseService.deleteAvatar(this.first).subscribe(
                  response => {},
                  error => {
                    console.log(error);
                  }
                )
              }
              this._expenseService.addAvatar(this.filex).subscribe(
                response => {
                  imagen = response.data;
                  this.expenseImage.imagen = imagen;
                  this.expenseImage.id = id;
                  this._expenseService.updateImage(this.expenseImage).subscribe(
                    response => {
                      this.toastr.success(response.msg);
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
          } else {
            if(this.first){
              this._expenseService.deleteAvatar(this.first).subscribe(
                response => {},
                error => {
                  console.log(error);
                }
              )
            }
          }
          /* if(proyecto != 0){
            let datap = {
              montopag: monto
            }
            this._expenseService.putSaldo(proyecto,datap).subscribe(
              response => {
                this.toastr.success(response.msg);
              },
              error => {
                console.log(error);
              }
            );
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
    this._tipogastoService.getAllAct().subscribe(
      response => {
        if(response.tpogastos){
          this.tipogastos = response.tpogastos;
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
        if(response.tpocuentas){
          this.tipocuentas = response.tpocuentas;
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
    this._cecoService.getAllAct().subscribe(
      response => {
        if(response.cecos){
          this.cecos = response.cecos;
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

  getProjects(){
    this._projectService.getAll(this.ceco).subscribe(
      response => {
        if(response.projects) {
          this.projects = response.projects;
        }
      },
      error => {
        console.log(error);
        if(error.status == 419){
          this._userService.logout();
        }
      }
    );
  }

  getMonedas(){
    this._trxcurrencyService.getAll().subscribe(
      response => {
        if(response.trxcurrencies){
          this.monedas = response.trxcurrencies;
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
        if(response.categories){
          this.categories = response.categories;
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
        if(response.subcategories){
          this.subcategories = response.subcategories;
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
        if(response.subcategories2){
          this.subcategories2 = response.subcategories2;
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
        if(response.providers){
          this.providers = response.providers;
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
        if(response.users){
          this.users = response.users;
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

  async getEstTotal(){
    await this._estimateService.getTotals().subscribe(
      response => {
        if(response.estimates){
          this.estimates = response.estimates;
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

  /* getCeco(){
    this._cecoService.getId(this.ceco).subscribe(
    response => {
        if(response.ceco) {
            this.cecoName = response.ceco.centrocosto;
            /* if(this.ceco.imagen){
                this.first = this.ceco.imagen;
            }
            this.fileName = this.ceco.imagen;
        } /* else {
            this._router.navigate(['/ceco']);
        }
    },
    error => {
        console.log(error);
    });
  } */


  newCategoria(e: Event){
    e.preventDefault();
    this.bsModalRef = this._modalService.show(NewcategoryComponent);

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        this.categories = result;
      }
    })
  }

  newSubCategoria(e: Event){
    e.preventDefault();
    this.bsModalRef = this._modalService.show(NewsubcategoryComponent);

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        this.categories = result;
      }
    })
  }

  newSubCategoria2(e: Event){
    e.preventDefault();
    this.bsModalRef = this._modalService.show(Newsubcategory2Component);

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        this.categories = result;
      }
    })
  }

  newProveedor(e: Event){
    e.preventDefault();
    this.bsModalRef = this._modalService.show(NewproviderComponent);

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        this.providers = result.data;
        this.expense.proveedor_id = result.newId;
      }
    })
  }

  newProject(e: Event){
    e.preventDefault();
    const cecoid = localStorage.getItem('ceco');
    const initialState = {
      list: [cecoid],
      title: 'Nuevo Proyecto',
    };

    this.bsModalRef = this._modalService.show(NewprojectComponent, {initialState});

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        this.projects = result.data;
        this.expense.proyecto_id = result.newId;
        this.expense.proveedor_id = result.prov;
      }
    })
  }

  viewImage(e: Event) {
    e.preventDefault();
    const initialState = {
      list: [this.fileName,this.url],
      title: 'Imagen',
    }

    this.bsModalRef = this._modalService.show(ViewimageComponent, {initialState, class: 'modal-xl'});

  }


}


