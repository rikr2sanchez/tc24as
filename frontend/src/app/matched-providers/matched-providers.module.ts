import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MatchedProvidersComponent } from './matched-providers.component';
import { MatchedProvidersRoutingModule } from './matched-providers-routing.module';
import { MpTableComponent } from '../mp-table/mp-table.component';
import { StatusComponent } from '../status/status.component';
import { RowmenuComponent } from '../rowmenu/rowmenu.component';
import { RatingComponent } from '../rating/rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    MatchedProvidersRoutingModule],
  declarations: [
    MatchedProvidersComponent,
    MpTableComponent,
    StatusComponent,
    RowmenuComponent,
    RatingComponent]
})
export class MatchedProvidersModule {}
