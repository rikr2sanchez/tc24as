import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatchedProviderFormComponent } from './matched_provider-form.component';
import { MatchedProviderListComponent } from './matched_provider-list.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Matched Providers'
    },
    children: [
      {
        path: 'list',
        component: MatchedProviderListComponent,
        data: {
          title: 'List'
        }
      },
      {
        path: 'create',
        component: MatchedProviderFormComponent,
        data: {
          title: 'Create'
        }
      },
      {
        path: ':id',
        component: MatchedProviderFormComponent,
        data: {
          title: 'Update'
        }
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchedProviderRoutingModule {}
