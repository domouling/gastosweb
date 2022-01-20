import {Component, OnInit} from '@angular/core';

import { UserService } from '@services/user.service'; 

@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss'],
    providers: [UserService]
})
export class MenuSidebarComponent implements OnInit {
    public user;
    public menu = MENU;

    constructor(
        private _userService: UserService
    ) {}

    ngOnInit() {
        this.user =  this._userService.getIdentity();
    }
}

export const MENU = [
    {
        icon: 'bi bi-speedometer2',
        role: 'ALL',
        name: 'Dashboard',
        path: ['/']
    },
    {
        icon: 'bi bi-receipt',
        role: 'ALL',
        name: 'Gastos',
        path: ['/expense']
    },
    {
        icon: 'bi bi-kanban',
        role: 'ALL',
        name: 'Presupuestos',
        path: ['/estimate']
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
                name: 'Centro de Costo',
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
        ]
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
        name: 'SubCategoria',
        path: ['/subcategory']
    },
    {
        icon: 'bi bi-tag',
        role: 'ALL',
        name: 'SubCategoria2',
        path: ['/subcategory2']
    },
    {
        icon: 'bi bi-journal-richtext',
        role: 'ALL',
        name: 'Reportes',
        path: ['/reports']
    },
];