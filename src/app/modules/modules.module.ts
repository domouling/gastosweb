import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component"; 
import { LoginComponent } from "./login/login.component"; 
import { MainComponent } from "./main/main.component";
import { FooterComponent } from "./main/footer/footer.component";
import { HeaderComponent } from "./main/header/header.component";
import { MenuSidebarComponent } from "./main/menu-sidebar/menu-sidebar.component";
import { PrivacyPolicyComponent } from "./privacy-policy/privacy-policy.component";
import { RecoverPasswordComponent } from "./recover-password/recover-password.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations: [
        ForgotPasswordComponent,
        LoginComponent,
        MainComponent,
        FooterComponent,
        HeaderComponent,
        MenuSidebarComponent,
        PrivacyPolicyComponent,
        RecoverPasswordComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ForgotPasswordComponent,
        LoginComponent,
        MainComponent,
        FooterComponent,
        HeaderComponent,
        MenuSidebarComponent,
        PrivacyPolicyComponent,
        RecoverPasswordComponent,
        RegisterComponent
    ]
})
export class ModulesModule {}