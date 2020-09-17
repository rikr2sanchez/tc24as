import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';

import { environment } from './../../environments/environment';
import { GlobalService } from './global.service';
import { ResponseBody } from './response-body';
import { MatchedProvider } from './matched_provider';
import { Observable } from 'rxjs';
import { MatchedProviderList } from './matched_provider-list';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class MatchedProviderService {
  redirectURL = '';
  loggedIn = false;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage: any
  ) {

  }
  public static getStatusTypes(): any[] {
    return [
      {
        label: 'Active',
        value: 10
      },
      {
        label: 'Disabled',
        value: 0
      }
    ];
  }

  // GET /v1/matched-provider
  getAllMatchedProviders(extendedQueries?: any): Observable<MatchedProviderList> {
    const headers = GlobalService.getHeaders();

    let queries = {
      per_page: 10
    };
    if (extendedQueries) {
      queries = { ...queries, ...extendedQueries };
    }

    return this.http
      .get<ResponseBody>(this.globalService.apiHost + '/matched-provider?' + SharedService.serializeQueryString(queries), {
        headers
      })
      .pipe(
        map(response => {
          console.log(response);
          return new MatchedProviderList(response.data);
        }),
        catchError(err => GlobalService.handleError(err))
      );
  }

  // GET /v1/matched-provider/1
  getMatchedProviderById(id: number): Observable<MatchedProvider> {
    const headers = GlobalService.getHeaders();

    return this.http
      .get<ResponseBody>(this.globalService.apiHost + '/matched-provider/' + id, {
        headers
      })
      .pipe(
        map(response => {
          return response.data as MatchedProvider;
        }),
        catchError(err => GlobalService.handleError(err))
      );
  }

}
