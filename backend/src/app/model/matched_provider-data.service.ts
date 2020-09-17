import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';

import { SharedService } from '../shared/shared.service';
import { GlobalService } from './global.service';
import { ResponseBody } from './response-body';
import { User } from './user';
import { UserList } from './user-list';
import { MatchedProviderList } from './matched_provider-list';
import { MatchedProvider } from './matched_provider';

@Injectable()
export class MatchedProviderDataService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  public static getStatusTypes(): any[] {
    return [
      {
        label: 'Contacting',
        value: 0
      },
      {
        label: 'Talked',
        value: 1
      },
      {
        label: 'Assessment',
        value: 2
      },
      {
        label: 'Contract',
        value: 3
      },
      {
        label: 'Cancel',
        value: 4
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

  // POST /v1/matched-provider
  addMatchedProvider(mp: MatchedProvider): Observable<any> {
    const headers = GlobalService.getHeaders();

    return this.http
      .post<ResponseBody>(this.globalService.apiHost + '/matched-provider', JSON.stringify(mp), {
        headers
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(err => GlobalService.handleError(err))
      );
  }

  // DELETE /v1/matched-provider/1
  deleteMatchedProviderById(id: number): Observable<any> {
    const headers = GlobalService.getHeaders();

    return this.http
      .delete<ResponseBody>(this.globalService.apiHost + '/matched-provider/' + id, {
        headers
      })
      .pipe(
        map(response => {
          return response;
        }),
        catchError(err => GlobalService.handleError(err))
      );
  }

  // PUT /v1/matched-provider//1
  updateMatchedProviderById(mp: MatchedProvider): Observable<any> {
    const headers = GlobalService.getHeaders();

    return this.http
      .put<ResponseBody>(this.globalService.apiHost + '/matched-provider/' + mp.id, JSON.stringify(mp), {
        headers
      })
      .pipe(
        map(response => {
          return response;
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
