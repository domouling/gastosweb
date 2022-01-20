import {
    Component,
    OnInit,
    Renderer2,
    OnDestroy,
    HostBinding
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router'; 
import { UserService } from '@services/user.service';
import { ToastrService } from 'ngx-toastr';

import { User } from '@/models/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [UserService]
})
export class RegisterComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'register-box';

    public registerForm: FormGroup;
    public isAuthLoading = false;
    public status: string;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private _userService: UserService,
        private _router: Router
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'register-page'
        );
        this.registerForm = new FormGroup({
            name: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, [Validators.required]),
            retypePassword: new FormControl(null, [Validators.required])
        });
    }

    async registerByAuth() {
        if (this.registerForm.valid) {
            this.isAuthLoading = true;
            await this._userService.register(this.registerForm.value).subscribe(
                response => {
                    if(response.status == 'success'){
                        this.status = 'success';
                        this.toastr.success('Registro Exitoso!')
                        setTimeout(() => this._router.navigate(['/login']), 1000);
                    } else {
                        this.status = 'error';
                        this.toastr.error('No se puedo insertar Registro...');
                    }
                },
                error => {
                    this.status = 'error';
                    this.toastr.error(error.error.msg);
                }
            )
            this.isAuthLoading = false;
        } else {
            this.toastr.error('Datos erroneos.. Revisar');
        }
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'register-page'
        );
    }
}
