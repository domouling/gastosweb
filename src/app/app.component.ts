import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public showLogin:boolean = false;

    constructor(
        private _router: Router
    ){
        this._router.events.forEach((event) => {
            if(event instanceof NavigationStart) {
                this.showLogin = event.url === '/login';
            }
        })
    }
}
