import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss'],
    providers: [UserService]
})
export class MenuItemComponent implements OnInit {
    @Input() menuItem: any = null;
    public isExpandable: boolean = false;
    @HostBinding('class.nav-item') isNavItem: boolean = true;
    @HostBinding('class.menu-open') isMenuExtended: boolean = false;
    public isMainActive: boolean = false;
    public isOneOfChildrenActive: boolean = false;
    public identity: any;

    constructor(
        private router: Router,
        private _userService: UserService
    ) {
        this.identity = [];
    }

    ngOnInit(): void {
        this.getInfo();
        if (
            this.menuItem &&
            this.menuItem.children &&
            this.menuItem.children.length > 0
        ) {
            this.isExpandable = true;
        }
        this.calculateIsActive(this.router.url);
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.calculateIsActive(event.url);
            });
    }

    async getInfo() {
        (await this._userService.getIdentity()).subscribe(
            response => {
                this.identity = response.data;
            },
            error => {
                console.log(error);
            }
        )
    }

    public handleMainMenuAction() {
        if (this.isExpandable) {
            this.toggleMenu();
            return;
        }
        this.router.navigate(this.menuItem.path);
    }

    public toggleMenu() {
        this.isMenuExtended = !this.isMenuExtended;
    }

    public calculateIsActive(url: string) {
        this.isMainActive = false;
        this.isOneOfChildrenActive = false;

        if (this.isExpandable) {

            this.menuItem.children.forEach((item) => {
                let men1 = (item.path[0].split('/'))[1];
                if (url.includes(men1)) {
                    this.isOneOfChildrenActive = true;
                    this.isMenuExtended = true;
                }
            });
        } else if (this.menuItem.path[0] === url) {
            this.isMainActive = true;
        }
        if (!this.isMainActive && !this.isOneOfChildrenActive) {
            this.isMenuExtended = false;
        }
    }
}
