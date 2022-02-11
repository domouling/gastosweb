import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';

import {DashboardComponent} from '@pages/dashboard/dashboard.component';

import { UserListComponent } from '@pages/user/user-list/user-list.component';
import { UserNewComponent } from '@pages/user/user-new/user-new.component';
import { UserEditComponent } from '@pages/user/user-edit/user-edit.component';
import { ProviderListComponent } from '@pages/provider/provider-list/provider-list.component';
import { CategoryListComponent } from '@pages/category/category-list/category-list.component';
import { BudgetListComponent } from '@pages/budget/budget-list/budget-list.component';
import { ReportListComponent } from '@pages/report/report-list/report-list.component';
import { TpocuentaListComponent } from '@pages/tpocuenta/tpocuenta-list/tpocuenta-list.component';
import { TpocuentaNewComponent } from '@pages/tpocuenta/tpocuenta-new/tpocuenta-new.component';
import { TpocuentaEditComponent } from '@pages/tpocuenta/tpocuenta-edit/tpocuenta-edit.component';
import { TrxcurrencyListComponent } from '@pages/trxcurrency/trxcurrency-list/trxcurrency-list.component';
import { TrxcurrencyNewComponent } from '@pages/trxcurrency/trxcurrency-new/trxcurrency-new.component';
import { TrxcurrencyEditComponent } from '@pages/trxcurrency/trxcurrency-edit/trxcurrency-edit.component';
import { CecoListComponent } from '@pages/ceco/ceco-list/ceco-list.component';
import { CecoNewComponent } from '@pages/ceco/ceco-new/ceco-new.component';
import { CecoEditComponent } from '@pages/ceco/ceco-edit/ceco-edit.component';
import { TipogastoListComponent } from '@pages/tipogasto/tipogasto-list/tipogasto-list.component';
import { TipogastoEditComponent } from '@pages/tipogasto/tipogasto-edit/tipogasto-edit.component';
import { TipogastoNewComponent } from '@pages/tipogasto/tipogasto-new/tipogasto-new.component';
import { CategoryNewComponent } from '@pages/category/category-new/category-new.component';
import { CategoryEditComponent } from '@pages/category/category-edit/category-edit.component';
import { SubcategoryListComponent } from '@pages/subcategory/subcategory-list/subcategory-list.component';
import { SubcategoryEditComponent } from '@pages/subcategory/subcategory-edit/subcategory-edit.component';
import { SubcategoryNewComponent } from '@pages/subcategory/subcategory-new/subcategory-new.component';
import { Subcategory2ListComponent } from '@pages/subcategory2/subcategory2-list/subcategory2-list.component';
import { Subcategory2EditComponent } from '@pages/subcategory2/subcategory2-edit/subcategory2-edit.component';
import { Subcategory2NewComponent } from '@pages/subcategory2/subcategory2-new/subcategory2-new.component';
import { ProviderEditComponent } from '@pages/provider/provider-edit/provider-edit.component';
import { ProviderNewComponent } from '@pages/provider/provider-new/provider-new.component';
import { BudgetNewComponent } from '@pages/budget/budget-new/budget-new.component';
import { BudgetEditComponent } from '@pages/budget/budget-edit/budget-edit.component';
import { ExpenseListComponent } from '@pages/expense/expense-list/expense-list.component';
import { ExpenseNewComponent } from '@pages/expense/expense-new/expense-new.component';
import { ExpenseEditComponent } from '@pages/expense/expense-edit/expense-edit.component';
import { CecoChoiceComponent } from '@pages/ceco/ceco-choice/ceco-choice.component';
import { ProjectListComponent } from '@pages/project/project-list/project-list.component';
import { ProjectNewComponent } from '@pages/project/project-new/project-new.component';
import { ProjectEditComponent } from '@pages/project/project-edit/project-edit.component';
import { PaymentListComponent } from '@pages/payment/payment-list/payment-list.component';
import { PaymentNewComponent } from '@pages/payment/payment-new/payment-new.component';
import { PaymentEditComponent } from '@pages/payment/payment-edit/payment-edit.component';

import { ModulesModule } from '@modules/modules.module';
import { NewcategoryComponent } from './expense/modal/newcategory/newcategory.component';
import { NewsubcategoryComponent } from './expense/modal/newsubcategory/newsubcategory.component';
import { NewproviderComponent } from './expense/modal/newprovider/newprovider.component';
import { Newsubcategory2Component } from './expense/modal/newsubcategory2/newsubcategory2.component';
import { NewprojectComponent } from './expense/modal/newproject/newproject.component';

/* registerLocaleData(localeEs, 'es-ES'); */

@NgModule({
    declarations: [
        BlankComponent,
        ProfileComponent,
        DashboardComponent,
        UserListComponent,
        UserNewComponent,
        UserEditComponent,
        ProviderListComponent,
        CategoryListComponent,
        BudgetListComponent,
        ReportListComponent,
        TpocuentaListComponent,
        TpocuentaNewComponent,
        TpocuentaEditComponent,
        TrxcurrencyListComponent,
        TrxcurrencyNewComponent,
        TrxcurrencyEditComponent,
        CecoListComponent,
        CecoNewComponent,
        CecoEditComponent,
        TipogastoListComponent,
        TipogastoEditComponent,
        TipogastoNewComponent,
        CategoryNewComponent,
        CategoryEditComponent,
        SubcategoryListComponent,
        SubcategoryEditComponent,
        SubcategoryNewComponent,
        Subcategory2ListComponent,
        Subcategory2EditComponent,
        Subcategory2NewComponent,
        ProviderEditComponent,
        ProviderNewComponent,
        BudgetNewComponent,
        BudgetEditComponent,
        ExpenseListComponent,
        ExpenseNewComponent,
        ExpenseEditComponent,
        CecoChoiceComponent,
        ProjectListComponent,
        ProjectNewComponent,
        ProjectEditComponent,
        PaymentListComponent,
        PaymentNewComponent,
        PaymentEditComponent,
        NewcategoryComponent,
        NewsubcategoryComponent,
        NewproviderComponent,
        Newsubcategory2Component,
        NewprojectComponent
    ],
    exports: [
        BlankComponent,
        ProfileComponent,
        DashboardComponent,
        UserListComponent,
        UserNewComponent,
        UserEditComponent,
        ProviderListComponent,
        CategoryListComponent,
        BudgetListComponent,
        ReportListComponent,
        TpocuentaListComponent,
        TpocuentaNewComponent,
        TpocuentaEditComponent,
        TrxcurrencyListComponent,
        TrxcurrencyNewComponent,
        TrxcurrencyEditComponent,
        CecoListComponent,
        CecoNewComponent,
        CecoEditComponent,
        TipogastoListComponent,
        TipogastoEditComponent,
        TipogastoNewComponent,
        CategoryNewComponent,
        CategoryEditComponent,
        SubcategoryListComponent,
        SubcategoryEditComponent,
        SubcategoryNewComponent,
        Subcategory2ListComponent,
        Subcategory2EditComponent,
        Subcategory2NewComponent,
        ProviderEditComponent,
        ProviderNewComponent,
        BudgetNewComponent,
        BudgetEditComponent,
        ExpenseListComponent,
        ExpenseNewComponent,
        ExpenseEditComponent,
        CecoChoiceComponent,
        ProjectListComponent,
        ProjectNewComponent,
        ProjectEditComponent,
        PaymentListComponent,
        PaymentNewComponent,
        PaymentEditComponent
    ],
    imports: [
        ModulesModule
    ]
})
export class PagesModule {}