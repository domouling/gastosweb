import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import moment, { Moment } from 'moment';

import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { NewcategoryComponent } from '../modal/newcategory/newcategory.component';
import { NewproviderComponent } from '../modal/newprovider/newprovider.component';
import { NewsubcategoryComponent } from '../modal/newsubcategory/newsubcategory.component';
import { Newsubcategory2Component } from '../modal/newsubcategory2/newsubcategory2.component';
import { NewprojectComponent } from '../modal/newproject/newproject.component';

import { UserService } from '@services/user.service';
import { ExpenseService } from '@services/expense.service';
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
    ProjectService,
    TrxCurrencyService,
    SubCategoryService,
    SubCategoryService2
  ]
})
export class ExpenseNewComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public today: string;
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

  public ceco:number;
  public cecoName: string = '';

  public bsModalRef: BsModalRef;

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
    private _projectService: ProjectService,
    private _providerService: ProviderService,
    private _tipogastoService: TipoGastoService,
    private _tipocuentaService: TpoCuentaService,
    private _trxcurrencyService: TrxCurrencyService,
    private _modalService: BsModalService
  ) {

    this.today = moment().format('YYYY-MM-DD');

    this.ceco = parseInt(localStorage.getItem('ceco'));

    this.expense = new Expense(null,0,0,null,null,null,null,this.today,null,0,null,null,1,0,0,0,null,1,1,1,this.ceco,1,0,0,null,1,'','');
    this.expenseImage = new ExpenseImage(1,'');
    this.title = 'Movimientos';
    this.subtitle = 'Nuevo Cargo';
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
    this.getProjects();
    this.getCeco();
    this.getMonedas();
  }

  onChgSubc(data: any){
    let subc :any = (<HTMLInputElement>document.getElementById('subcategoria_id'));
    let subc2 :any = (<HTMLInputElement>document.getElementById('subcategoria2_id'));
    let catx :any = (<HTMLInputElement>document.getElementById('categoria_id'));

    this.getSubCatId(data);
    this.expense.subcategoria_id = 0;
    this.expense.subcategoria2_id = 0;
    subc.value = 0;
    subc2.value = 0;
  }

  onChgSubc2(data: any){
    let subc2 :any = (<HTMLInputElement>document.getElementById('subcategoria2_id'));
    this.getSubCat2Id(data);
    this.expense.subcategoria2_id = 0;
    subc2.value = 0;
  }

  async onChgMonto(data: any) {
    this.montonvogasto = data;
  }

  async onMetodChange(data:any){
    let proy: any = document.getElementById('colproj');
    if(data == 4){
      proy.classList.replace('d-none','d-block');
    } else {
      proy.classList.replace('d-block','d-none');
    }
  }

  async onChgMetod(data: any){
    //console.log(this.estimates);
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
    //console.log(this.total);
  }

  onProjectChange(data:any){
    this._projectService.getId(data).subscribe(
      response => {
        if(response.status = 'success'){
          this.expense.proveedor_id = response.project.proveedor_id;
        }
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


  onSubmit(form:any){
    let imagen = this.expense.imagen;
    if(this.expense.tipogasto_id != 4){
      this.expense.proyecto_id = 0;
    }
    let proyecto = this.expense.proyecto_id;
    let monto = this.expense.monto;

    this._expenseService.add(this.expense).subscribe(
      response => {
        if(response.status == 'success'){
          this.status = 'success';
          this.msg = 'Cargo creado con exito!';
          let id = response.expense.id;
          if(imagen){
            if(this.filex){
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

  getEstTotal(){
    this._estimateService.getTotals().subscribe(
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

  getCeco(){
    this._cecoService.getId(this.ceco).subscribe(
    response => {
        if(response.ceco) {
            this.cecoName = response.ceco.centrocosto;

        }
    },
    error => {
        console.log(error);
    });
  }

  newCategoria(e: Event){
    e.preventDefault();
    this.bsModalRef = this._modalService.show(NewcategoryComponent);

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        this.categories = result.data;
        this.expense.categoria_id = result.newId;
      }
    })
  }

  newSubCategoria(e: Event){
    e.preventDefault();

    this._categoryService.getId(this.expense.categoria_id).subscribe(
      response => {
        if(response.category){
          const nombre = response.category.nombre;
          const initialState = {
              list: [nombre],
              title: 'Nueva Subcategoria',
              id: response.category.id
          };

          this.bsModalRef = this._modalService.show(NewsubcategoryComponent, {initialState});

          this.bsModalRef.content.onClose = new Subject<boolean>();
          this.bsModalRef.content.onClose.subscribe(result => {
            if(result !== null){
              this.subcategories = result.data;
              this.expense.subcategoria_id = result.newId;
              this.onChgSubc(result.newId);
            }
          })
        }
      }
    )
  }

  newSubCategoria2(e: Event){
    e.preventDefault();

    this._subcategoryService.getId(this.expense.subcategoria_id).subscribe(
      response => {
        if(response.subcategory){
          const nombre = response.subcategory.nombre;
          const initialState = {
              list: [nombre],
              title: 'Nueva Descripción',
              id: response.subcategory.id
          };

          this.bsModalRef = this._modalService.show(Newsubcategory2Component, {initialState});

          this.bsModalRef.content.onClose = new Subject<boolean>();
          this.bsModalRef.content.onClose.subscribe(result => {
            if(result !== null){
              this.subcategories2 = result.data;
              this.expense.subcategoria2_id = result.newId;
            }
          })
        }
      }
    )
  }

  newProveedor(e: Event){
    e.preventDefault();
    this.bsModalRef = this._modalService.show(NewproviderComponent);

    this.bsModalRef.content.onClose = new Subject<boolean>();
    this.bsModalRef.content.onClose.subscribe(result => {
      if(result !== null){
        console.log(result);
        this.providers = result;
        console.log(this.providers);
        this.expense.proveedor_id = result.newId;
        console.log(this.expense.proveedor_id)
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


}
