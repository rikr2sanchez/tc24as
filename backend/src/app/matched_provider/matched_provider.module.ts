import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { MatchedProviderFormComponent } from './matched_provider-form.component';
import { MatchedProviderListComponent } from './matched_provider-list.component';
import { MatchedProviderRoutingModule } from './matched_provider-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, MatchedProviderRoutingModule],
  declarations: [MatchedProviderFormComponent, MatchedProviderListComponent]
})
export class MatchedProviderModule {}
