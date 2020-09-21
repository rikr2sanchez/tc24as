import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { MatchedProvider } from '../model/matched_provider';
import { MatchedProviderService } from '../model/matched_provider.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit, AfterViewInit {

  @Input() mp: MatchedProvider;

  contactingLogo: SafeHtml;
  talkedLogo: SafeHtml;
  scheduledLogo: SafeHtml;
  signedLogo: SafeHtml;
  cancelLogo: SafeHtml;

  options = new Map<string, string>([]);

  constructor(sanitizer: DomSanitizer, private mpService: MatchedProviderService) {
    this.contactingLogo = sanitizer.bypassSecurityTrustUrl('assets/img/Contacting 0.svg');
    this.scheduledLogo = sanitizer.bypassSecurityTrustUrl( 'assets/img/Assessment scheduled.svg');
    this.talkedLogo = sanitizer.bypassSecurityTrustUrl('assets/img/Talked to the client.svg');
    this.signedLogo = sanitizer.bypassSecurityTrustUrl('assets/img/Contract Signed.svg');
    this.cancelLogo = sanitizer.bypassSecurityTrustUrl('assets/img/Cancel the client.svg');

    this.icon = this.scheduledLogo;
    this.options = new Map<string, string>([
      ['contacting', 'Contacting'],
      ['talked', 'Talked to the client'],
      ['scheduled', 'Assessment Scheduled'],
      ['signed', 'Contract Signed'],
      ['cancel', 'Cancel the client']
    ]);
  }

  selected = 'scheduled';
  icon = this.scheduledLogo;

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    switch (this.mp.status){
      case 0: {
        this.selected = 'contacting';
        this.icon = this.contactingLogo;
        break;
      }
      case 1 : {
        this.selected = 'talked';
        this.icon = this.talkedLogo;
        break;
      }
      case 2 : {
        this.selected = 'scheduled';
        this.icon = this.scheduledLogo;
        break;
      }
      case 3 : {
        this.selected = 'signed';
        this.icon = this.signedLogo;
        break;
      }
      case 4 : {
        this.selected = 'cancel';
        this.icon = this.cancelLogo;
        break;
      }
    }
  }

  setSelected(s: string): void {
    this.selected = s;
    switch (s){
      case 'contacting': {
        this.mp.status = 0;
        this.mpService.updateMatchedProviderById(this.mp).subscribe(response => {
            this.icon = this.contactingLogo;
            console.log(response);
        },
          error => {
            console.log('STATUS NOT UPDATED');
          });

        break;
      }
      case 'talked' : {
        this.mp.status = 1;
        this.mpService.updateMatchedProviderById(this.mp).subscribe(response => {
            this.icon = this.talkedLogo;
            console.log(response);
          },
          error => {
            console.log('STATUS NOT UPDATED');
          });
        break;
      }
      case 'scheduled' : {
        this.mp.status = 2;
        this.mpService.updateMatchedProviderById(this.mp).subscribe(response => {
            this.icon = this.scheduledLogo;
            console.log(response);
          },
          error => {
            console.log('STATUS NOT UPDATED');
          });
        break;
      }
      case 'signed' : {
        this.mp.status = 3;
        this.mpService.updateMatchedProviderById(this.mp).subscribe(response => {
            this.icon = this.contactingLogo;
            console.log(response);
          },
          error => {
            console.log('STATUS NOT UPDATED');
          });
        break;
      }
      case 'cancel' : {
        this.mp.status = 4;
        this.mpService.updateMatchedProviderById(this.mp).subscribe(response => {
            this.icon = this.contactingLogo;
            console.log(response);
          },
          error => {
            console.log('STATUS NOT UPDATED');
          });
        break;
      }
    }
  }

  getSelected(): string {
    return this.selected;
  }

  getOptionValue(s: string): string {
    return this.options.get(s);
  }


}
