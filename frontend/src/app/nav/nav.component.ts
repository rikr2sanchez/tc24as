import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../model/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserDataService } from '../model/user-data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit, AfterViewChecked {

  errorMessage: string;
  public today: Date;
  user: User;
  mode = '';

  constructor(private userService: UserService,
              private userDataService: UserDataService,
              private cdRef: ChangeDetectorRef,
              public router: Router) {
    this.today = new Date();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {

    this.errorMessage = '';
    this.userDataService.getMe().subscribe(
      user => {
        this.user = user;
        this.mode = 'view';
      },
      error => {
        // unauthorized access
        if (error.status === 401 || error.status === 403) {
          this.userService.unauthorizedAccess(error);
        } else {
          this.errorMessage = error.data.message;
        }
      }
    );
  }
}
