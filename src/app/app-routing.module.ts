import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainComponent} from '@modules/main/main.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {LoginComponent} from '@modules/login/login.component';
import {ProfileComponent} from '@pages/profile/profile.component';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';

import {AuthGuard} from '@guards/auth.guard';
import {NonAuthGuard} from '@guards/non-auth.guard';
import { CecoSelectGuard } from '@guards/ceco-select.guard';
import { AdminGuard } from '@guards/admin.guard';


import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from '@modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from '@pages/main-menu/main-menu.component';
import {SubMenuComponent} from '@pages/main-menu/sub-menu/sub-menu.component';
import { UserListComponent } from '@pages/user/user-list/user-list.component';
import { UserNewComponent } from '@pages/user/user-new/user-new.component';
import { UserEditComponent } from '@pages/user/user-edit/user-edit.component';
import { ExpenseListComponent } from '@pages/expense/expense-list/expense-list.component';
import { ExpenseNewComponent } from '@pages/expense/expense-new/expense-new.component';
import { ExpenseEditComponent } from '@pages/expense/expense-edit/expense-edit.component';
import { PaymentListComponent } from '@pages/payment/payment-list/payment-list.component';
import { PaymentNewComponent } from  '@pages/payment/payment-new/payment-new.component';
import { PaymentEditComponent } from  '@pages/payment/payment-edit/payment-edit.component';
import { ProjectListComponent } from '@pages/project/project-list/project-list.component';
import { ProjectNewComponent } from '@pages/project/project-new/project-new.component';
import { ProjectEditComponent } from '@pages/project/project-edit/project-edit.component';
import { ProviderListComponent } from '@pages/provider/provider-list/provider-list.component';
import { ProviderEditComponent } from '@pages/provider/provider-edit/provider-edit.component';
import { ProviderNewComponent } from '@pages/provider/provider-new/provider-new.component';
import { CategoryListComponent } from '@pages/category/category-list/category-list.component';
import { CategoryNewComponent } from '@pages/category/category-new/category-new.component';
import { CategoryEditComponent } from '@pages/category/category-edit/category-edit.component';
import { SubcategoryListComponent } from '@pages/subcategory/subcategory-list/subcategory-list.component';
import { SubcategoryNewComponent } from '@pages/subcategory/subcategory-new/subcategory-new.component';
import { SubcategoryEditComponent } from '@pages/subcategory/subcategory-edit/subcategory-edit.component';
import { Subcategory2ListComponent } from '@pages/subcategory2/subcategory2-list/subcategory2-list.component';
import { Subcategory2NewComponent } from '@pages/subcategory2/subcategory2-new/subcategory2-new.component';
import { Subcategory2EditComponent } from '@pages/subcategory2/subcategory2-edit/subcategory2-edit.component';
import { BudgetListComponent } from '@pages/budget/budget-list/budget-list.component';
import { BudgetNewComponent } from '@pages/budget/budget-new/budget-new.component';
import { BudgetEditComponent } from '@pages/budget/budget-edit/budget-edit.component';
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
import { TipogastoNewComponent } from '@pages/tipogasto/tipogasto-new/tipogasto-new.component';
import { TipogastoEditComponent } from '@pages/tipogasto/tipogasto-edit/tipogasto-edit.component';
import { CecoChoiceComponent } from '@pages/ceco/ceco-choice/ceco-choice.component';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard, CecoSelectGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'admin/users',
                component: UserListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/users/new',
                component: UserNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/users/edit/:id',
                component: UserEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'expense',
                component: ExpenseListComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'expense/new',
                component: ExpenseNewComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'expense/edit/:id',
                component: ExpenseEditComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'admin/provider',
                component: ProviderListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/provider/new',
                component: ProviderNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/provider/edit/:id',
                component: ProviderEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/category',
                component: CategoryListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/category/new',
                component: CategoryNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/category/edit/:id',
                component: CategoryEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subcategory',
                component: SubcategoryListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subcategory/new',
                component: SubcategoryNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subcategory/edit/:id',
                component: SubcategoryEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subcategory2',
                component: Subcategory2ListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subcategory2/new',
                component: Subcategory2NewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/subcategory2/edit/:id',
                component: Subcategory2EditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/estimate',
                component: BudgetListComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'admin/estimate/new',
                component: BudgetNewComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'admin/estimate/edit/:id',
                component: BudgetEditComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'reports',
                component: ReportListComponent,
            },
            {
                path: 'admin/tpocuenta',
                component: TpocuentaListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/tpocuenta/edit/:id',
                component: TpocuentaEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/tpocuenta/new',
                component: TpocuentaNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/trxcurrency',
                component: TrxcurrencyListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/trxcurrency/edit/:id',
                component: TrxcurrencyEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/trxcurrency/new',
                component: TrxcurrencyNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/ceco',
                component: CecoListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/ceco/edit/:id',
                component: CecoEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/ceco/new',
                component: CecoNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/tipogasto',
                component: TipogastoListComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/tipogasto/edit/:id',
                component: TipogastoEditComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'admin/tipogasto/new',
                component: TipogastoNewComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'blank',
                component: BlankComponent
            },
            {
                path: 'sub-menu-1',
                component: SubMenuComponent
            },
            {
                path: 'sub-menu-2',
                component: BlankComponent
            },
            {
                path: '',
                component: DashboardComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'choice',
                component: CecoChoiceComponent,
                canActivate: [AdminGuard]
            },
            {
                path: 'projects',
                component: ProjectListComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'projects/edit/:id',
                component: ProjectEditComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'projects/new',
                component: ProjectNewComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'payments',
                component: PaymentListComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'payments/edit/:id',
                component: PaymentEditComponent,
                canActivate: [CecoSelectGuard]
            },
            {
                path: 'payments/new',
                component: PaymentNewComponent,
                canActivate: [CecoSelectGuard]
            },
        ]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'recover-password',
        component: RecoverPasswordComponent,
        canActivate: [NonAuthGuard]
    },
    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
        canActivate: [NonAuthGuard]
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
