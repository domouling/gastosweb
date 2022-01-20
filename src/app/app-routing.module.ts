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

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'users',
                component: UserListComponent,
            },
            {
                path: 'users/new',
                component: UserNewComponent,
            },
            {
                path: 'users/edit/:id',
                component: UserEditComponent,
            },
            {
                path: 'expense',
                component: ExpenseListComponent,
            },
            {
                path: 'expense/new',
                component: ExpenseNewComponent,
            },
            {
                path: 'expense/edit/:id',
                component: ExpenseEditComponent,
            },
            {
                path: 'provider',
                component: ProviderListComponent,
            },
            {
                path: 'provider/new',
                component: ProviderNewComponent,
            },
            {
                path: 'provider/edit/:id',
                component: ProviderEditComponent,
            },
            {
                path: 'category',
                component: CategoryListComponent,
            },
            {
                path: 'category/new',
                component: CategoryNewComponent,
            },
            {
                path: 'category/edit/:id',
                component: CategoryEditComponent,
            },
            {
                path: 'subcategory',
                component: SubcategoryListComponent,
            },
            {
                path: 'subcategory/new',
                component: SubcategoryNewComponent,
            },
            {
                path: 'subcategory/edit/:id',
                component: SubcategoryEditComponent,
            },
            {
                path: 'subcategory2',
                component: Subcategory2ListComponent,
            },
            {
                path: 'subcategory2/new',
                component: Subcategory2NewComponent,
            },
            {
                path: 'subcategory2/edit/:id',
                component: Subcategory2EditComponent,
            },
            {
                path: 'estimate',
                component: BudgetListComponent,
            },
            {
                path: 'estimate/new',
                component: BudgetNewComponent,
            },
            {
                path: 'estimate/edit/:id',
                component: BudgetEditComponent,
            },
            {
                path: 'reports',
                component: ReportListComponent,
            },
            {
                path: 'tpocuenta',
                component: TpocuentaListComponent,
            },
            {
                path: 'tpocuenta/edit/:id',
                component: TpocuentaEditComponent,
            },
            {
                path: 'tpocuenta/new',
                component: TpocuentaNewComponent,
            },
            {
                path: 'trxcurrency',
                component: TrxcurrencyListComponent,
            },
            {
                path: 'trxcurrency/edit/:id',
                component: TrxcurrencyEditComponent,
            },
            {
                path: 'trxcurrency/new',
                component: TrxcurrencyNewComponent,
            },
            {
                path: 'ceco',
                component: CecoListComponent,
            },
            {
                path: 'ceco/edit/:id',
                component: CecoEditComponent,
            },
            {
                path: 'ceco/new',
                component: CecoNewComponent,
            },
            {
                path: 'tipogasto',
                component: TipogastoListComponent,
            },
            {
                path: 'tipogasto/edit/:id',
                component: TipogastoEditComponent,
            },
            {
                path: 'tipogasto/new',
                component: TipogastoNewComponent,
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
                component: DashboardComponent
            }
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
