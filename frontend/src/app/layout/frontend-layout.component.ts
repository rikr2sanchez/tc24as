import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UserService } from './../model/user.service';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend-layout.component.html'
})
export class FrontendLayoutComponent implements OnInit, AfterViewChecked {
  public userData: any = {};
  public today: Date;

  constructor(public userService: UserService, private cdRef: ChangeDetectorRef, public router: Router) {
    this.today = new Date();
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    const jwtValue: any = this.userService.getJWTValue();
    if (jwtValue !== null) {
      this.userData = jwtValue.data;
    }
  }
}
