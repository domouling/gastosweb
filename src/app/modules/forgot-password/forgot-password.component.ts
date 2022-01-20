import {
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    Renderer2
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public forgotPasswordForm: FormGroup;
    public isAuthLoading = false;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.forgotPasswordForm = new FormGroup({
            email: new FormControl(null, Validators.required)
        });
    }

    forgotPassword() {
        if (this.forgotPasswordForm.valid) {
            this.toastr.success('Se enviaria un correo');
        } else {
            this.toastr.error('Error');
        }
    }

    ngOnDestroy(): void {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
