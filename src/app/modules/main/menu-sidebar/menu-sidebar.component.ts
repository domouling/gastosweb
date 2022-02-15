import {Component, Input, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserService } from '@services/user.service';

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss'],
    providers: [UserService]
})
export class MenuSidebarComponent implements OnInit {
    public user:any = '';
    public menu = MENU;
    public cecoch: any;
    public message: any;
    public editMessage: string;


    @Input() NombreCeco: string = '';

    constructor(
        public _userService: UserService
    ) {}

    ngOnInit() {
        this.getInfo();
        this._userService.mensaje$.pipe(take(1)).subscribe(msg => this.message);
        /* this._userService.change.subscribe(message => {
            this.message = message;
            console.log('entre' + this.message);
        }) */
        //this.getCecoChoice();
    }

    async getInfo() {
        (await this._userService.getIdentity()).subscribe(
            response => {
                this.user = response.data;
            },
            error => {
                console.log(error);
            }
        )
    }

    getCecoChoice(){
        this.cecoch = this._userService.getCecoChoice();
    }
}

export const MENU = [
    {
        icon: 'bi bi-layers',
        role: 'ROLE_ADMIN',
        name: 'Elegir Ceco',
        path: ['/choice']
    },
    {
        icon: 'bi bi-speedometer2',
        role: 'ALL',
        name: 'Dashboard',
        path: ['/']
    },
    {
        icon: 'bi bi-receipt',
        role: 'ALL',
        name: 'Movimientos',
        path: ['/expense']
    },
    /* {
        icon: 'bi bi-wallet2',
        role: 'ALL',
        name: 'Abonos',
        path: ['/payments']
    }, */
    /* {
        icon: 'bi bi-kanban',
        role: 'ALL',
        name: 'Presupuestos',
        path: ['/estimate']
    }, */
    {
        icon: 'bi bi-journals',
        role: 'ALL',
        name: 'Proyectos',
        path: ['/projects']
    },
    {
        icon: 'bi bi-gear',
        role: 'ROLE_ADMIN',
        name: 'Administrador',
        children: [
            {
                icon: 'bi bi-people',
                role: 'ROLE_ADMIN',
                name: 'Usuarios',
                path: ['/users'],
            },
            {
                icon: 'bi bi-award',
                role: 'ROLE_ADMIN',
                name: 'Centro Costo',
                path: ['/ceco'],
            },
            {
                icon: 'bi bi-credit-card',
                role: 'ROLE_ADMIN',
                name: 'Tipo Cuenta',
                path: ['/tpocuenta'],
            },
            {
                icon: 'bi bi-receipt',
                role: 'ROLE_ADMIN',
                name: 'Tipo Gasto',
                path: ['/tipogasto'],
            },
            {
                icon: 'bi bi-coin',
                role: 'ROLE_ADMIN',
                name: 'Moneda',
                path: ['/trxcurrency'],
            },
            {
                icon: 'bi bi-building',
                role: 'ALL',
                name: 'Proveedores',
                path: ['/provider']
            },
            {
                icon: 'bi bi-tags',
                role: 'ALL',
                name: 'Categorias',
                path: ['/category']
            },
            {
                icon: 'bi bi-tag',
                role: 'ALL',
                name: 'Concepto',
                path: ['/subcategory']
            },
            {
                icon: 'bi bi-tag',
                role: 'ALL',
                name: 'Detalle',
                path: ['/subcategory2']
            },
        ]
    },
    {
        icon: 'bi bi-journal-richtext',
        role: 'ALL',
        name: 'Reportes',
        path: ['/reports']
    },

];
