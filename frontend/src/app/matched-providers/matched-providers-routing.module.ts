import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchedProvidersComponent } from './matched-providers.component';

const routes: Routes = [
  {
    path: '',

    data: {
      title: 'Matched Providers'
    },
    children: [
      {
        path: ':id',
        component: MatchedProvidersComponent,
        data: {
          title: 'Matched Providers'
        }
      },
      {
        path: '',
        pathMatch: 'full',
        component: MatchedProvidersComponent,
        data: {
          title: 'Matched Providers'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchedProvidersRoutingModule {}
