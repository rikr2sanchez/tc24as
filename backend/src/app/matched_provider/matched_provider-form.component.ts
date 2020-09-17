import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';

import { StaffService } from '../model/staff.service';
import { User } from '../model/user';
import { UserDataService } from '../model/user-data.service';

import _ from 'lodash';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { MatchedProviderDataService } from '../model/matched_provider-data.service';
import { MatchedProvider } from '../model/matched_provider';

@Component({
  templateUrl: './matched_provider-form.component.html'
})
export class MatchedProviderFormComponent implements OnInit, OnDestroy {
  mode: string = '';

  id: number;
  parameters: any;
  mp: MatchedProvider;

  errorMessage: string;

  form: FormGroup;
  formErrors: any;
  submitted: boolean = false;

  // Status Types
  statusTypes: any = {};

  constructor(
    private mpdataService: MatchedProviderDataService,
    private staffService: StaffService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    // Construct form group
    this.form = formBuilder.group(
      {
        type: [
          '',
          Validators.compose([
            // Validators.required
          ])
        ],
        name: [
          '',
          Validators.compose([
            // Validators.required,
            // CustomValidators.rangeLength([1, 100]),
            // Validators.pattern('^[A-Za-z]{1,100}$')
          ])
        ],
        email: [
          '',
          Validators.compose([
          // Validators.required, CustomValidators.email
        ])
        ],
        phone: [
          '',
          Validators.compose([
          // Validators.pattern('^[0-9+-]')
        ])
        ],
        _ID: [
          '',
          Validators.compose([
          // Validators.required
        ])],
        status: [
          '',
          Validators.compose([
            // Validators.required
          ])]
      }
    );

    this.statusTypes = MatchedProviderDataService.getStatusTypes();

    this.form.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  setFormErrors(errorFields: any): void {
    for (const key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) {
        continue;
      }

      this.formErrors[key].valid = false;
      this.formErrors[key].message = errorFields[key];
    }
  }

  setFormField(field: string, value: any) {
    this.form.controls[field].setValue(value);
  }

  resetFormErrors(): void {
    this.formErrors = {
      type: { valid: true, message: '' },
      name: { valid: true, message: '' },
      email: { valid: true, message: '' },
      phone: { valid: true, message: '' },
      _ID: { valid: true, message: '' },
      status: { valid: true, message: '' }
    };
  }

  isValid(field: string): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if (this.form.controls[field].touched === false) {
      isValid = true;
    } else if (this.form.controls[field].touched === true && this.form.controls[field].valid === true) {
      // If the field is touched and valid value, then it is considered as valid.
      isValid = true;
    }

    return isValid;
  }

  onValueChanged(_data?: any) {
    if (!this.form) {
      return;
    }
    const form = this.form;
    for (const field of Object.keys(this.formErrors)) {
      // clear previous error message (if any)
      const control = form.get(field);
      if (control && control.dirty) {
        this.formErrors[field].valid = true;
        this.formErrors[field].message = '';
      }
    }
  }

  resetMatchedProvider() {
    this.mp = new MatchedProvider();
    this.mp.type = '';
    this.mp.name = '';
    this.mp.email = '';
    this.mp.phone = '';
    this.mp._ID = '';
    this.mp.status = 0;

    this.setMatchedProviderToForm();
  }

  ngOnInit() {
    this.resetFormErrors();
    this.resetMatchedProvider();

    // _route is activated route service. this.route.params is observable.
    // subscribe is method that takes function to retrieve parameters when it is changed.
    this.parameters = this.activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if (typeof params['id'] !== 'undefined') {
        this.id = Number.parseInt(params['id'], 10);
        this.errorMessage = '';
        this.mpdataService.getMatchedProviderById(this.id).subscribe(
          mp => {
            this.mp = mp;
            this.setMatchedProviderToForm();
            this.mode = 'update';
          },
          error => {
            this.errorMessage = error.data.message;
          }
        );
      } else {
        this.mode = 'create';
      }
    });
  }

  ngOnDestroy() {
    this.parameters.unsubscribe();
    this.mp = new MatchedProvider();
  }

  onSubmit() {
    this.submitted = true;
    this.resetFormErrors();

    this.setFormToMatchedProvider();

    if (this.mode === 'create') {
      this.mpdataService.addMatchedProvider(this.mp).subscribe(
        result => {
          if (result.success) {
            this.router.navigate(['/matched-provider']);
          } else {
            this.submitted = false;
          }
        },
        error => {
          this.submitted = false;
          // Validation errors
          if (error.status === 422) {
            this.setFormErrors(JSON.parse(error.data.message));
          } else { // (error.status === 401 || error.status === 403)
            // All other errors
            this.errorMessage = error.data.message;
          }
        }
      );
    } else if (this.mode === 'update') {
      this.mpdataService.updateMatchedProviderById(this.mp).subscribe(
        result => {
          if (result.success) {
            this.router.navigate(['/matched-provider']);
          } else {
            this.submitted = false;
          }
        },
        error => {
          this.submitted = false;
          // Validation errors
          if (error.status === 422) {
            this.setFormErrors(JSON.parse(error.data.message));
          } else if (error.status === 401 || error.status === 403) {
            // Unauthorized Access
            this.staffService.unauthorizedAccess(error);
          } else {
            // All other errors
            this.errorMessage = error.data.message;
          }
        }
      );
    }
  }

  private setMatchedProviderToForm() {
    _.forIn(this.mp, (value: any, key: string) => {
      if (typeof this.form.controls[key] !== 'undefined') {
        this.form.controls[key].setValue(value);
      }
    });
  }

  private setFormToMatchedProvider() {
    _.forIn(this.form.getRawValue(), (value: any, key: string) => {
      if (typeof this.mp[key] !== 'undefined') {
        this.mp[key] = value;
      }
    });
  }
}

