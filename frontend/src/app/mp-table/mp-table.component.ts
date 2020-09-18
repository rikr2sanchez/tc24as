import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { MatchedProviderService } from '../model/matched_provider.service';
import { MatchedProvider } from '../model/matched_provider';
import { MatchedProviderList } from '../model/matched_provider-list';
import { Observable } from 'rxjs';
import { CallService } from '../model/call.service';
import { UserDataService } from '../model/user-data.service';
import { UserService } from '../model/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-mp-table',
  templateUrl: './mp-table.component.html',
  styleUrls: ['./mp-table.component.scss']
})
export class MpTableComponent implements OnInit, AfterViewInit{

  mplist$: Observable<MatchedProviderList>;

  me: User;

  constructor(@Inject(DOCUMENT) document,
              private mpservice: MatchedProviderService,
              private callService: CallService,
              public userService: UserService,
              private userDataService: UserDataService
  ) { }


  ngOnInit(): void {
    this.userDataService.getMe().subscribe(user => {
      this.me = user;
    })
    this.mplist$ =  this.mpservice.getAllMatchedProviders();
  }

  ngAfterViewInit(): void {

  }

  callMatchedProvider(mp: MatchedProvider) {

    this.callService.call(this.me.username, this.me.phone_number, mp.phone)
    .subscribe(data => {
      console.log('CALL OK !');
    },error => {
      console.log('CALL ERROR');
      }
    )
  }

}
