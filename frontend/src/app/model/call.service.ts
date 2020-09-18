import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable()
export class CallService {

  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {

  }

  public call(adminName: string, adminPhone: string, providerPhone: string) {
    return this.http.get(this.globalService.apiHost + '/call',
      {
        params: {
          adminName,
          adminPhone,
          providerPhone
        }
      }
    )
  }
}
