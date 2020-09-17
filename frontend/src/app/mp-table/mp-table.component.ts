import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { MatchedProviderService } from '../model/matched_provider.service';
import { MatchedProvider } from '../model/matched_provider';
import { MatchedProviderList } from '../model/matched_provider-list';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mp-table',
  templateUrl: './mp-table.component.html',
  styleUrls: ['./mp-table.component.scss']
})
export class MpTableComponent implements OnInit, AfterViewInit{

  mplist$: Observable<MatchedProviderList>;

  constructor(@Inject(DOCUMENT) document, private mpservice: MatchedProviderService) { }


  ngOnInit(): void {
    this.mplist$ =  this.mpservice.getAllMatchedProviders();
  }

  ngAfterViewInit(): void {

  }

  setCanceled(i: number): void {
    const el = document.getElementById('tr' + (i > 0 ? i : -1 * i));
    if (i < 0){
      const idx = -1 * i;
      if (idx % 2 === 0 ){
        el.style.background = '#f4f7f9';
      }else{
        el.style.background = 'white';
      }
    } else {
      el.style.background = '#fbe8ec';
    }
  }

}
