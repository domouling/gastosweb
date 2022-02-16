import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule } from 'ngx-mask';
import { NgChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal'

import {AppRoutingModule} from '@/app-routing.module';
import {AppComponent} from './app.component';
import {MainComponent} from '@modules/main/main.component';
import {LoginComponent} from '@modules/login/login.component';
import {HeaderComponent} from '@modules/main/header/header.component';
import {FooterComponent} from '@modules/main/footer/footer.component';
import {MenuSidebarComponent} from '@modules/main/menu-sidebar/menu-sidebar.component';
import {BlankComponent} from '@pages/blank/blank.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from '@pages/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RegisterComponent} from '@modules/register/register.component';
import {DashboardComponent} from '@pages/dashboard/dashboard.component';
import {ToastrModule} from 'ngx-toastr';
import {MessagesComponent} from '@modules/main/header/messages/messages.component';
import {NotificationsComponent} from '@modules/main/header/notifications/notifications.component';
import {ButtonComponent} from './components/button/button.component';

/* import {registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es'; */
import {UserComponent} from '@modules/main/header/user/user.component';
import {ForgotPasswordComponent} from '@modules/forgot-password/forgot-password.component';
import {RecoverPasswordComponent} from '@modules/recover-password/recover-password.component';
import {PrivacyPolicyComponent} from './modules/privacy-policy/privacy-policy.component';
import {MainMenuComponent} from './pages/main-menu/main-menu.component';
import {SubMenuComponent} from './pages/main-menu/sub-menu/sub-menu.component';
import {MenuItemComponent} from './components/menu-item/menu-item.component';
import {DropdownComponent} from './components/dropdown/dropdown.component';
import {DropdownMenuComponent} from './components/dropdown/dropdown-menu/dropdown-menu.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserNewComponent } from './pages/user/user-new/user-new.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { ProviderListComponent } from './pages/provider/provider-list/provider-list.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { BudgetListComponent } from './pages/budget/budget-list/budget-list.component';
import { ReportListComponent } from './pages/report/report-list/report-list.component';
import { TpocuentaListComponent } from './pages/tpocuenta/tpocuenta-list/tpocuenta-list.component';
import { TpocuentaNewComponent } from './pages/tpocuenta/tpocuenta-new/tpocuenta-new.component';
import { TpocuentaEditComponent } from './pages/tpocuenta/tpocuenta-edit/tpocuenta-edit.component';
import { TrxcurrencyListComponent } from './pages/trxcurrency/trxcurrency-list/trxcurrency-list.component';
import { TrxcurrencyNewComponent } from './pages/trxcurrency/trxcurrency-new/trxcurrency-new.component';
import { TrxcurrencyEditComponent } from './pages/trxcurrency/trxcurrency-edit/trxcurrency-edit.component';
import { CecoListComponent } from './pages/ceco/ceco-list/ceco-list.component';
import { CecoNewComponent } from './pages/ceco/ceco-new/ceco-new.component';
import { CecoEditComponent } from './pages/ceco/ceco-edit/ceco-edit.component';
import { TipogastoListComponent } from './pages/tipogasto/tipogasto-list/tipogasto-list.component';
import { TipogastoEditComponent } from './pages/tipogasto/tipogasto-edit/tipogasto-edit.component';
import { TipogastoNewComponent } from './pages/tipogasto/tipogasto-new/tipogasto-new.component';
import { CategoryNewComponent } from './pages/category/category-new/category-new.component';
import { CategoryEditComponent } from './pages/category/category-edit/category-edit.component';
import { SubcategoryListComponent } from './pages/subcategory/subcategory-list/subcategory-list.component';
import { SubcategoryEditComponent } from './pages/subcategory/subcategory-edit/subcategory-edit.component';
import { SubcategoryNewComponent } from './pages/subcategory/subcategory-new/subcategory-new.component';
import { Subcategory2ListComponent } from './pages/subcategory2/subcategory2-list/subcategory2-list.component';
import { Subcategory2EditComponent } from './pages/subcategory2/subcategory2-edit/subcategory2-edit.component';
import { Subcategory2NewComponent } from './pages/subcategory2/subcategory2-new/subcategory2-new.component';
import { ProviderEditComponent } from './pages/provider/provider-edit/provider-edit.component';
import { ProviderNewComponent } from './pages/provider/provider-new/provider-new.component';
import { BudgetNewComponent } from './pages/budget/budget-new/budget-new.component';
import { BudgetEditComponent } from './pages/budget/budget-edit/budget-edit.component';
import { ExpenseListComponent } from './pages/expense/expense-list/expense-list.component';
import { ExpenseNewComponent } from './pages/expense/expense-new/expense-new.component';
import { ExpenseEditComponent } from './pages/expense/expense-edit/expense-edit.component';
import { CecoChoiceComponent } from './pages/ceco/ceco-choice/ceco-choice.component';
import { ProjectListComponent } from './pages/project/project-list/project-list.component';
import { ProjectNewComponent } from './pages/project/project-new/project-new.component';
import { ProjectEditComponent } from './pages/project/project-edit/project-edit.component';
import { PaymentListComponent } from './pages/payment/payment-list/payment-list.component';
import { PaymentNewComponent } from './pages/payment/payment-new/payment-new.component';
import { PaymentEditComponent } from './pages/payment/payment-edit/payment-edit.component';
import { NewcategoryComponent } from './pages/expense/modal/newcategory/newcategory.component';
import { NewsubcategoryComponent } from './pages/expense/modal/newsubcategory/newsubcategory.component';
import { Newsubcategory2Component } from './pages/expense/modal/newsubcategory2/newsubcategory2.component';
import { NewproviderComponent } from './pages/expense/modal/newprovider/newprovider.component';
import { NewprojectComponent } from './pages/expense/modal/newproject/newproject.component';
import { ViewimageComponent } from '@pages/expense/modal/viewimage/viewimage.component';
import { UserService } from '@services/user.service';

/* registerLocaleData(localeEs, 'es-ES'); */

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        MenuSidebarComponent,
        BlankComponent,
        ProfileComponent,
        RegisterComponent,
        DashboardComponent,
        MessagesComponent,
        NotificationsComponent,
        ButtonComponent,
        UserComponent,
        ForgotPasswordComponent,
        RecoverPasswordComponent,
        PrivacyPolicyComponent,
        MainMenuComponent,
        SubMenuComponent,
        MenuItemComponent,
        DropdownComponent,
        DropdownMenuComponent,
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
        Newsubcategory2Component,
        NewproviderComponent,
        NewprojectComponent,
        ViewimageComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        NgChartsModule,
        DataTablesModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NgxMaskModule.forRoot({
            showMaskTyped: false
        }),
        ToastrModule.forRoot({
            timeOut: 2500,
            positionClass: 'toast-top-right',
            preventDuplicates: true
        }),
        ModalModule.forRoot()
    ],
    providers: [UserService],
    bootstrap: [AppComponent]
})
export class AppModule {}
