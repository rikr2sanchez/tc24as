import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() idx;
  @Output() idxo =  new EventEmitter();

  contactingLogo: SafeHtml;
  talkedLogo: SafeHtml;
  scheduledLogo: SafeHtml;
  signedLogo: SafeHtml;
  cancelLogo: SafeHtml;

  options = new Map<string, string>([]);

  constructor(sanitizer: DomSanitizer) {
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
    console.log(this.contactingLogo);
  }

  setSelected(s: string): void {
    this.selected = s;
    // this.tss.setStatus(s);
    switch (s){
      case 'contacting': {
        this.icon = this.contactingLogo;
        this.notifyRedTr(-1);
        break;
      }
      case 'talked' : {
        this.icon = this.talkedLogo;
        this.notifyRedTr(-1);
        break;
      }
      case 'scheduled' : {
        this.icon = this.scheduledLogo;
        this.notifyRedTr(-1);
        break;
      }
      case 'signed' : {
        this.icon = this.signedLogo;
        this.notifyRedTr(-1);
        break;
      }
      case 'cancel' : {
        this.icon = this.cancelLogo;
        this.notifyRedTr(1);
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

  notifyRedTr(neg: number): void {

    this.idxo.emit(neg * this.idx);
  }

}
