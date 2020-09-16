import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../model/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit, AfterViewChecked {
  public userData: any = {};
  public today: Date;

  constructor(public userService: UserService, private cdRef: ChangeDetectorRef) {
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
