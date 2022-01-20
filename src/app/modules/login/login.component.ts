import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [UserService]
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: FormGroup;
    public isAuthLoading = false;
    public status: string;
    public identity: any;
    public token: any;
    public user: any;

    constructor(
        private renderer: Renderer2,
        private toastr: ToastrService,
        private _userService: UserService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

    loginByAuth() {
        if (this.loginForm.valid) {
            
            this.isAuthLoading = true;
            this._userService.signup(this.loginForm.value).subscribe(
                response => {
                    if(response.data || response.status == 'success'){
                        this.identity = response.data;
                        
                        localStorage.setItem('identity', JSON.stringify(this.identity));

                        this._userService.signup(this.loginForm.value, true).subscribe(
                            response => {
                                if(response.token){
                                    this.status = 'success';
                                    this.token = response.token;
                                    localStorage.setItem('token', this.token);
                                    this.toastr.success('Login Exitoso!');
                                    setTimeout(() => this._router.navigate(['/']), 500);
                                } else {
                                    this.status = 'error';
                                }
                            },
                            error => {
                                this.status = 'error';
                            }
                        )
                    } else {
                        this.status = 'error';
                        this.toastr.error(response.msg);
                    }
                },
                error => {
                    //console.log(error);
                    this.toastr.error(error.error.msg);
                }
            );

            this.isAuthLoading = false;
        } else {
            this.toastr.error('Error al Ingresar!');
        }
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
