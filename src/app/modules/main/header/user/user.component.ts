import {Component, OnInit} from '@angular/core';
/* import {AppService} from '@services/app.service'; */
import { UserService } from '@services/user.service';
import { global } from '@services/global';
import {DateTime} from 'luxon';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [UserService]
})
export class UserComponent implements OnInit {
    public user: any;
    public url: string;

    constructor(private _userService: UserService) {
        this.url = global.url;
    }

    ngOnInit(): void {
        this.user = this._userService.getIdentity();
    }

    logout() {
        this._userService.logout();
    }

    formatDate(date) {
        return DateTime.fromISO(date).toFormat('dd LLL yyyy');
    }
}
