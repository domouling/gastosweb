import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { UserService } from '@services/user.service';
import { Router } from '@angular/router';
/* import {AppService} from '@services/app.service'; */

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [UserService]
})
export class HeaderComponent implements OnInit {
    @Output() toggleMenuSidebar: EventEmitter<any> = new EventEmitter<any>();
    public searchForm: FormGroup;

    constructor(
      private _userServices: UserService,
      public router: Router
    ) {}

    ngOnInit() {
        this.searchForm = new FormGroup({
            search: new FormControl(null)
        });
    }

    logout() {
        this._userServices.logout();
    }
}
