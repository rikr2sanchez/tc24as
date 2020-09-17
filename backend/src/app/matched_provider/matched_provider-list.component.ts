import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { StaffService } from '../model/staff.service';
import { User } from '../model/user';
import { UserDataService } from '../model/user-data.service';
import { UserList } from '../model/user-list';
import { MatchedProviderList } from '../model/matched_provider-list';
import { MatchedProviderDataService } from '../model/matched_provider-data.service';
import { MatchedProvider } from '../model/matched_provider';

@Component({
  templateUrl: './matched_provider-list.component.html'
})
export class MatchedProviderListComponent implements OnInit {
  matchedProviderList: MatchedProviderList;
  errorMessage: string;

  loading: boolean;
  searchParams: any;
  totalCount: number;
  currentPage: number;
  pageSize: number;

  constructor(
    private matchedProviderDataService: MatchedProviderDataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    this.currentPage = typeof queryParams['page'] !== 'undefined' ? +queryParams['page'] : 1;

    // Load search params
    this.searchParams = {};

    // Override page
    this.searchParams.page = this.currentPage;

    if (typeof queryParams['q'] !== 'undefined') {
      this.searchParams.q = queryParams['q'] + '';
    }
  }

  onSearchFormSubmit() {
    this.searchParams.page = 1;
    this.currentPage = 1;
    this.getMatchedProviders();
  }

  /**
   * Clear search params
   */
  clearSearchParams() {
    // Load search params
    this.searchParams = {};

    this.getMatchedProviders();
  }

  /**
   * Handle page changed from pagination
   *
   * @param event
   */
  pageChanged(event: any): void {
    if (event.page !== this.currentPage) {
      this.currentPage = event.page;
      this.searchParams.page = this.currentPage;

      this.getMatchedProviders();
    }
  }

  ngOnInit() {
    this.getMatchedProviders();
  }

  public getMatchedProviders() {
    this.matchedProviderList = null;
    this.loading = true;

    this.router.navigate([], { queryParams: this.searchParams });

    this.matchedProviderDataService.getAllMatchedProviders(this.searchParams).subscribe(
      matchedProviderList => {
        this.matchedProviderList = matchedProviderList;
        this.totalCount = this.matchedProviderList.pagination.totalCount;
        this.pageSize = this.matchedProviderList.pagination.defaultPageSize;
        this.loading = false;
      },
      error => {
        this.errorMessage = error.data.message;
        this.loading = false;
      }
    );
  }

  public viewMatchedProvider(mp: MatchedProvider): void {
    this.router.navigate(['/matched-provider', mp.id]);
  }

  public confirmDeleteMatchedProvider(mp: MatchedProvider): void {
    // Due to sweet alert scope issue, define as function variable and pass to swal

    // tslint:disable-next-line: no-this-assignment
    const parent = this;

    this.errorMessage = '';

    Swal.fire({
      title: 'Are you sure?',
      text: "Once delete, you won't be able to revert this!",
      icon: 'question',
      showLoaderOnConfirm: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      preConfirm() {
        parent.loading = true;
        return new Promise(resolve => {
          parent.matchedProviderDataService.deleteMatchedProviderById(mp.id).subscribe(
            _result => {
              parent.getMatchedProviders();
              parent.loading = false;
              resolve();
            },
            error => {
              parent.errorMessage = error.data.message;
              parent.loading = false;
              resolve();
            }
          );
        });
      }
    });
  }
}
